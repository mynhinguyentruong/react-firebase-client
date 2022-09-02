import dayjs from 'dayjs';
// MUI stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { markNotificationsRead } from '../../redux/userReducer'
import { useSelector, useDispatch } from 'react-redux';

import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

export default function Notifications() {
    const [anchorEl, setAnchorEl] = useState(null)

    const dispatch = useDispatch()
    const { notifications } = useSelector(state => state.user)

    const handleClose = () => setAnchorEl(null)

    function handleOpen(e) {
      setAnchorEl(e.currentTarget)
      const unreadNotificationsIds = notifications.filter((notif) => !notif.read).map((notif) => notif.notificationId);
      dispatch(markNotificationsRead(unreadNotificationsIds))
    }

    const notificationsMarkup = notifications?.map(notif => {
        const verb = notif.type === 'like' ? 'liked' : 'commented on';
        const time = dayjs(notif.createdAt).fromNow();
        const iconColor = notif.read ? 'primary' : 'secondary';
        const icon = notif.type === 'like' ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          )
        return (
         
          <MenuItem key={notif.createdAt} onClick={handleClose}>
            {icon}
            <Link
              component={RouterLink}
              variant="body1"
              to={`/users/${notif.recipient}/scream/${notif.screamId}`}
            >
              <strong>{notif.sender}</strong> {verb} your scream {time}
            </Link>
          </MenuItem>
          
        );
    });

    return (
      <>
        <Tooltip placement="bottom" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? 'simple-menu' : ''}
            aria-haspopup="true"
            onClick={handleOpen}
          >
            <Badge
              badgeContent={notifications.filter(notif => !notif.read).length}
              color="secondary"
              overlap="rectangular"
            >
              <NotificationsIcon style={{color: 'white'}}/>
            </Badge>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {notificationsMarkup}
        </Menu>
      </>
    );
}

