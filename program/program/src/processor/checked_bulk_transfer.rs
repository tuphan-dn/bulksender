use crate::helper::util;
use solana_program::{
  account_info::{next_account_info, AccountInfo},
  program_error::ProgramError,
  pubkey::Pubkey,
};
use std::result::Result;

pub fn exec(
  amounts: Vec<u64>,
  _program_id: &Pubkey,
  accounts: &[AccountInfo],
) -> Result<(), ProgramError> {
  let accounts_iter = &mut accounts.iter();
  let src_owner = next_account_info(accounts_iter)?;
  let src_acc = next_account_info(accounts_iter)?;
  let mint_acc = next_account_info(accounts_iter)?;

  let system_program = next_account_info(accounts_iter)?;
  let splt_program = next_account_info(accounts_iter)?;
  let sysvar_rent_acc = next_account_info(accounts_iter)?;
  let splata_program = next_account_info(accounts_iter)?;

  util::is_signer(&[src_owner])?;

  for amount in amounts.iter() {
    let dst_owner = next_account_info(accounts_iter)?;
    let dst_acc = next_account_info(accounts_iter)?;
    // Execute transfer (Initialize destination account if not existing)
    util::checked_transfer_splt(
      *amount,
      src_owner,
      src_acc,
      src_owner,
      dst_acc,
      dst_owner,
      mint_acc,
      system_program,
      splt_program,
      sysvar_rent_acc,
      splata_program,
      &[],
    )?;
  }

  Ok(())
}
