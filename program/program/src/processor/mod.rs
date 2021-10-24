use crate::instruction::AppInstruction;
use solana_program::{account_info::AccountInfo, entrypoint::ProgramResult, msg, pubkey::Pubkey};

pub mod checked_transfer;
pub mod checked_bulk_transfer;

pub struct Processor {}

impl Processor {
  pub fn process(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
  ) -> ProgramResult {
    let instruction = AppInstruction::unpack(instruction_data)?;
    match instruction {
      AppInstruction::CheckedTransfer { amount } => {
        msg!("Calling CheckedTransfer function");
        checked_transfer::exec(amount, program_id, accounts)?;
        Ok(())
      }
      AppInstruction::CheckedBulkTransfer { amounts } => {
        msg!("Calling CheckedBulkTransfer function");
        checked_bulk_transfer::exec(amounts, program_id, accounts)?;
        Ok(())
      }
    }
  }
}
