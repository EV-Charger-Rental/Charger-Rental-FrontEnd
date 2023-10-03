import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
// routes
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    // <Box
    //   ref={ref}
    //   component="div"
    //   sx={{
    //     width: 40,
    //     height: 40,
    //     display: 'inline-flex',
    //     ...sx,
    //   }}
    //   {...other}
    // >
    //   <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
    //     <defs>
    //       <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
    //         <stop offset="0%" stopColor={PRIMARY_DARK} />
    //         <stop offset="100%" stopColor={PRIMARY_MAIN} />
    //       </linearGradient>

    //       <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
    //         <stop offset="0%" stopColor={PRIMARY_LIGHT} />
    //         <stop offset="100%" stopColor={PRIMARY_MAIN} />
    //       </linearGradient>

    //       <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
    //         <stop offset="0%" stopColor={PRIMARY_LIGHT} />
    //         <stop offset="100%" stopColor={PRIMARY_MAIN} />
    //       </linearGradient>
    //     </defs>

    //     <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
    //       <path
    //         fill="url(#BG1)"
    //         d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
    //       />
    //       <path
    //         fill="url(#BG2)"
    //         d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
    //       />
    //       <path
    //         fill="url(#BG3)"
    //         d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
    //       />
    //     </g>
    //   </svg>
    // </Box>

    <Box
      component="img"
      src="data:image/png;base64,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" 
      sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    />


  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
