import httpclient from "../../utils/httpclient";
import {receiveAdminList, receiveInvitation} from "../../actions/admin/list";
import {connect} from "react-redux";
import AdminList from "../../components/admin/list";

const mapStateToProps = state => ({
    adminList: state.adminList,
    invitation: state.invitation
});

const mapDispatchToProps = dispatch => ({
    fetchAdminList: () => {
        httpclient.fetch('/api/admins')
            .then(resp => resp.json())
            .then(adminList => dispatch(receiveAdminList(adminList)));
    },

    createAdminInvitation: () => {
        httpclient.fetch('/api/admins/invite', {method: 'POST'})
            .then(resp => resp.json())
            .then(invitation => dispatch(receiveInvitation(invitation)));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminList);