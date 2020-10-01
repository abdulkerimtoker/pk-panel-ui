import {AdminPageActions} from "../../actions/admin";

export const admin = (state = null, action) => {
    switch (action.type) {
        case AdminPageActions.RECEIVE_ADMIN:
            return action.admin;
    }
    return state;
};

export const ranks = (state = null, action) => {
    switch (action.type) {
        case AdminPageActions.RECEIVE_RANKS:
            return action.ranks;
    }
    return state;
};

export const authorityList = (state = null, action) => {
    switch (action.type) {
        case AdminPageActions.RECEIVE_AUTHORITIES:
            return action.authorityList;
    }
    return state;
};

export const assignedAuthorities = (state = null, action) => {
    switch (action.type) {
        case AdminPageActions.RECEIVE_ASSIGNED_AUTHORITIES:
            return action.authorities;
    }
    return state;
};