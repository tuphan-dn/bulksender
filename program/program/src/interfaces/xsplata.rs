use solana_program::{
  account_info::AccountInfo, entrypoint::ProgramResult, program::invoke_signed,
};
use spl_associated_token_account::create_associated_token_account;

pub struct XSPLATA {}

impl XSPLATA {
  ///
  /// Initialize account
  ///
  pub fn initialize_account<'a>(
    funding_acc: &AccountInfo<'a>,
    target_acc: &AccountInfo<'a>,
    owner: &AccountInfo<'a>,
    mint_acc: &AccountInfo<'a>,
    system_program: &AccountInfo<'a>,
    splt_program: &AccountInfo<'a>,
    sysvar_rent_acc: &AccountInfo<'a>,
    splata_program: &AccountInfo<'a>,
    seed: &[&[&[u8]]],
  ) -> ProgramResult {
    let ix = create_associated_token_account(funding_acc.key, owner.key, mint_acc.key);
    invoke_signed(
      &ix,
      &[
        funding_acc.clone(),
        target_acc.clone(),
        owner.clone(),
        mint_acc.clone(),
        system_program.clone(),
        splt_program.clone(),
        sysvar_rent_acc.clone(),
        splata_program.clone(),
      ],
      seed,
    )?;
    Ok(())
  }
}
