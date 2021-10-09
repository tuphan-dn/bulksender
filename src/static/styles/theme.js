// Available vars: https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less

const DARK_SOLID_BG = '#181C36'
const LIGHT_SOLID_BG = '#2D3355'
const GLASS_BG =
  'linear-gradient(135deg, rgba(26, 30, 56, 0.45) 0%, rgba(35, 31, 54, 0.75) 100%)'

module.exports = {
  // Basis
  hack: `true;@import "${require.resolve('./index.less')}"`,

  // Colors
  '@primary-color': '#F9575E',
  '@info-color': '#37CDFA',
  '@success-color': '#3DBA4E',
  '@warning-color': '#FCB017',
  '@error-color': '#F2323F',
  '@body-background': DARK_SOLID_BG,
  '@component-background': LIGHT_SOLID_BG,

  // Fonts
  '@font-family': "'Barlow', 'Open Sans', sans-serif",

  // Border
  '@border-radius-base': '8px',
  '@border-color-base': 'rgba(255, 255, 255, 0.2)',
  '@border-width-base': '1px',
  '@border-color-split': 'rgba(255, 255, 255, 0.2)',

  // Card
  '@card-radius': '16px',
  '@card-actions-background': GLASS_BG,
  '@card-background': GLASS_BG,

  // Drawer
  '@drawer-bg': GLASS_BG,

  // Modal
  '@modal-header-bg': DARK_SOLID_BG,
  '@modal-content-bg': DARK_SOLID_BG,
}
