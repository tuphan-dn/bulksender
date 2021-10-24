use solana_program::{
  account_info::AccountInfo,
  entrypoint::ProgramResult,
  program::{invoke, invoke_signed},
};
use spl_token::instruction::{
  burn, close_account, initialize_account, initialize_mint, mint_to, sync_native, transfer,
};

pub struct XSPLT {}

impl XSPLT {
  ///
  /// Initialize mint
  ///
  pub fn initialize_mint<'a>(
    decimals: u8,
    mint_acc: &AccountInfo<'a>,
    mint_authority: &AccountInfo<'a>,
    freeze_authority: &AccountInfo<'a>,
    sysvar_rent_acc: &AccountInfo<'a>,
    splt_program: &AccountInfo<'a>,
    seed: &[&[&[u8]]],
  ) -> ProgramResult {
    let ix = initialize_mint(
      splt_program.key,
      mint_acc.key,
      mint_authority.key,
      Some(freeze_authority.key),
      decimals,
    )?;
    invoke_signed(
      &ix,
      &[
        mint_acc.clone(),
        sysvar_rent_acc.clone(),
        splt_program.clone(),
      ],
      seed,
    )?;
    Ok(())
  }
  ///
  /// Initialize account
  ///
  pub fn initialize_account<'a>(
    target_acc: &AccountInfo<'a>,
    mint_acc: &AccountInfo<'a>,
    owner: &AccountInfo<'a>,
    sysvar_rent_acc: &AccountInfo<'a>,
    splt_program: &AccountInfo<'a>,
    seed: &[&[&[u8]]],
  ) -> ProgramResult {
    let ix = initialize_account(splt_program.key, target_acc.key, mint_acc.key, owner.key)?;
    invoke_signed(
      &ix,
      &[
        target_acc.clone(),
        mint_acc.clone(),
        owner.clone(),
        sysvar_rent_acc.clone(),
        splt_program.clone(),
      ],
      seed,
    )?;
    Ok(())
  }
  ///
  /// Transfer
  ///
  pub fn transfer<'a>(
    amount: u64,
    src_acc: &AccountInfo<'a>,
    dst_acc: &AccountInfo<'a>,
    owner: &AccountInfo<'a>,
    splt_program: &AccountInfo<'a>,
    seed: &[&[&[u8]]],
  ) -> ProgramResult {
    let ix = transfer(
      splt_program.key,
      src_acc.key,
      dst_acc.key,
      owner.key,
      &[],
      amount,
    )?;
    invoke_signed(
      &ix,
      &[
        src_acc.clone(),
        dst_acc.clone(),
        owner.clone(),
        splt_program.clone(),
      ],
      seed,
    )?;
    Ok(())
  }
  ///
  /// Mint to
  ///
  pub fn mint_to<'a>(
    amount: u64,
    mint_acc: &AccountInfo<'a>,
    dst_acc: &AccountInfo<'a>,
    owner: &AccountInfo<'a>,
    splt_program: &AccountInfo<'a>,
    seed: &[&[&[u8]]],
  ) -> ProgramResult {
    let ix = mint_to(
      splt_program.key,
      mint_acc.key,
      dst_acc.key,
      owner.key,
      &[],
      amount,
    )?;
    invoke_signed(
      &ix,
      &[
        mint_acc.clone(),
        dst_acc.clone(),
        owner.clone(),
        splt_program.clone(),
      ],
      seed,
    )?;
    Ok(())
  }
  ///
  /// Burn
  ///
  pub fn burn<'a>(
    amount: u64,
    src_acc: &AccountInfo<'a>,
    mint_acc: &AccountInfo<'a>,
    owner: &AccountInfo<'a>,
    splt_program: &AccountInfo<'a>,
    seed: &[&[&[u8]]],
  ) -> ProgramResult {
    let ix = burn(
      splt_program.key,
      src_acc.key,
      mint_acc.key,
      owner.key,
      &[],
      amount,
    )?;
    invoke_signed(
      &ix,
      &[
        src_acc.clone(),
        mint_acc.clone(),
        owner.clone(),
        splt_program.clone(),
      ],
      seed,
    )?;
    Ok(())
  }
  ///
  /// Close account
  ///
  pub fn close_account<'a>(
    src_acc: &AccountInfo<'a>,
    dst_acc: &AccountInfo<'a>,
    owner: &AccountInfo<'a>,
    splt_program: &AccountInfo<'a>,
    seed: &[&[&[u8]]],
  ) -> ProgramResult {
    let ix = close_account(splt_program.key, src_acc.key, dst_acc.key, owner.key, &[])?;
    invoke_signed(
      &ix,
      &[
        src_acc.clone(),
        dst_acc.clone(),
        owner.clone(),
        splt_program.clone(),
      ],
      seed,
    )?;
    Ok(())
  }
  ///
  /// Sync native
  ///
  pub fn sync_native<'a>(
    target_acc: &AccountInfo<'a>,
    splt_program: &AccountInfo<'a>,
  ) -> ProgramResult {
    let ix = sync_native(splt_program.key, target_acc.key)?;
    invoke(&ix, &[target_acc.clone(), splt_program.clone()])?;
    Ok(())
  }
}
