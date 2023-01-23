import {
    ManageAccountsOutlined,
    EditOutliend,
    LocationOnOutlined,
    WorkoutOutlineOutlined,
} from "@mui/icons-material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { palette } =useTheme();
    const navigate = useNavigate();
    const token = useSelector((state))
}