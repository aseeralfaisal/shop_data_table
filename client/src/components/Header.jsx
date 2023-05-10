import { AdminPanelSettings, ShoppingCartCheckoutRounded } from "@mui/icons-material"
import { Typography } from "@mui/material"
import { colors } from "@mui/material"

const HeaderComponent = ({ logoSize = 60, titleSize = 24, align = "center", isAdmin = false }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: align }}>
        {isAdmin ?
            <AdminPanelSettings sx={{ fontSize: logoSize, color: colors.grey[800] }} />
            :
            <ShoppingCartCheckoutRounded sx={{ fontSize: logoSize, color: colors.grey[800] }} />
        }
        <Typography variant='h3' fontFamily="Poppins" fontSize={titleSize}
            color={colors.grey[800]} fontWeight={600}>{isAdmin ? 'Admin' : 'Shopping App'}</Typography>
    </div>
)
export default HeaderComponent