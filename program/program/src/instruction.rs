use crate::error::AppError;
use solana_program::program_error::ProgramError;
use std::convert::TryInto;

#[derive(Clone, Debug, PartialEq)]
pub enum AppInstruction {
  CheckedTransfer { amount: u64 },
  CheckedBulkTransfer { amounts: Vec<u64> },
}
impl AppInstruction {
  pub fn unpack(instruction: &[u8]) -> Result<Self, ProgramError> {
    let (&tag, rest) = instruction
      .split_first()
      .ok_or(AppError::InvalidInstruction)?;
    Ok(match tag {
      0 => {
        let amount = rest
          .get(..8)
          .and_then(|slice| slice.try_into().ok())
          .map(u64::from_le_bytes)
          .ok_or(AppError::InvalidInstruction)?;
        Self::CheckedTransfer { amount }
      }
      1 => {
        let num_txs = rest
          .get(..4)
          .and_then(|slice| slice.try_into().ok())
          .map(u32::from_le_bytes)
          .ok_or(AppError::InvalidInstruction)?;
        let mut amounts = Vec::new();
        for i in 0..num_txs {
          let start = 4 + i as usize * 8;
          let end = 12 + i as usize * 8;
          let amount = rest
            .get(start..end)
            .and_then(|slice| slice.try_into().ok())
            .map(u64::from_le_bytes)
            .ok_or(AppError::InvalidInstruction)?;
          amounts.push(amount);
        }
        Self::CheckedBulkTransfer { amounts }
      }
      _ => return Err(AppError::InvalidInstruction.into()),
    })
  }
}
