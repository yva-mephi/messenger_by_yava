import React from 'react';
import { userData } from '../../ExportModule/classes/user/users.js';
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import CircleIcon from '@mui/icons-material/Circle';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import styles from '../../styles/chatPage.module.scss';
import {getChatTitle} from '../../ExportModule/utils.js';
import {chatData} from "../../ExportModule/classes/chat/chats.js";

const Header = ({ currentChatId, onBack }) => {
    const chat = chatData.getChat(currentChatId);
    return (
        <header className={styles.chatHeader}>
            <div className={styles.partnerInfo}>
                <button className={styles.backbuttonChat} onClick={onBack}>
                    <ArrowBackSharpIcon />
                </button>
                <div className={styles.partnerName}>
                    {getChatTitle(chat)}
                </div>
                <div className={styles.partnerStatus}>
                    <CircleIcon />
                    <span className={styles.partnerStatusText}>offline</span>
                </div>
                <button type="button" className={styles.moreButton}>
                    <MoreVertRoundedIcon />
                </button>
            </div>
            <button type="button" className={styles.phoneButton}>
                <PhoneRoundedIcon />
            </button>
        </header>
    );
};

export default Header;
