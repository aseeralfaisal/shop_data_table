import { colors, Typography } from "@mui/material"
import { AdminPanelSettings, ShoppingCartCheckoutRounded } from "@mui/icons-material"

const HeaderComponent = ({ logoSize = 60, titleSize = 24, align = "center", isAdminRole = false }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: align }}>
        {isAdminRole ?
            <AdminPanelSettings sx={{ fontSize: logoSize, color: colors.grey[800] }} />
            :
            <ShoppingCartCheckoutRounded sx={{ fontSize: logoSize, color: colors.grey[800] }} />
        }
        <Typography variant='h3' fontFamily="Poppins" fontSize={titleSize}
            color={colors.grey[800]} fontWeight={600}>{isAdminRole ? 'Admin' : 'Shopping App'}</Typography>
    </div>
)

export default HeaderComponent