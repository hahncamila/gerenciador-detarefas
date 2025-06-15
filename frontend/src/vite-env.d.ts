/// <reference types="vite/client" />

declare module '@mui/material/Unstable_Grid2' {
    import { OverridableComponent } from '@mui/types';
    import { GridTypeMap } from '@mui/material/Grid/Grid';
  
    const Grid2: OverridableComponent<GridTypeMap>;
    export default Grid2;
  }
  