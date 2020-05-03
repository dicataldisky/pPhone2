import React from "react";

import "./BannerNotifications.scss";
import { iconList } from "../../const/app";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { INotif } from "../../redux/reducer/NotifReducer";
import { useReduxState } from "../../redux/store";
import { CSSTransitionGroup } from 'react-transition-group';


const BannerNotifications: React.FC<RouteComponentProps> = props => {
    const state = useReduxState<INotif[]>(state => state.notif);

    const onClicked = (notif: INotif) => {
        //todo remove notif on click
        props.history.push(notif.link);
    }

    return (
        <div className="banner-notification-container">
            <CSSTransitionGroup transitionName="notification" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                {state.map(notif => <Notification onClick={() => onClicked(notif)} key={notif.id} {...notif} />)}
            </CSSTransitionGroup>
        </div>
    );
};

interface INotificationProps extends INotif {
    onClick: () => void
};

const Notification: React.FC<INotificationProps> = props => {
    return (
        <div className="banner-notification" onClick={props.onClick}>
            <div className="banner-notification-header">
                <img src={iconList[props.appName]} />
                <h2>{props.appName.toUpperCase()}</h2>
                <h3>{props.date}</h3>
            </div>
            <h1>{props.title}</h1>
            <p>{props.message}</p>
        </div>
    )
}

export default withRouter(BannerNotifications);