///
/// Calculation precision
///
pub const PRECISION: u64 = 1000000000; // 10^9
pub const DOUBLE_PRECISION: u64 = 1000000000000000000; // 10^18

///
/// Implement square root for u128
///
pub trait U128Roots {
  fn sqrt(self) -> Self;
}

impl U128Roots for u128 {
  ///
  /// Babylonian method (with a selectively initial guesses)
  /// O(log(log(n))) for complexity
  ///
  fn sqrt(self) -> Self {
    if self < 2 {
      return self;
    }

    let bits = (128 - self.leading_zeros() + 1) / 2;
    let mut start = 1 << (bits - 1);
    let mut end = 1 << (bits + 1);
    while start < end {
      end = (start + end) / 2;
      start = self / end;
    }
    end
  }
}

///
/// Implement square root for u64
///
pub trait U64Roots {
  fn sqrt(self) -> Self;
}

impl U64Roots for u64 {
  ///
  /// Babylonian method (with a selectively initial guesses)
  /// O(log(log(n))) for complexity
  ///
  fn sqrt(self) -> Self {
    if self < 2 {
      return self;
    }

    let bits = (64 - self.leading_zeros() + 1) / 2;
    let mut start = 1 << (bits - 1);
    let mut end = 1 << (bits + 1);
    while start < end {
      end = (start + end) / 2;
      start = self / end;
    }
    end
  }
}
