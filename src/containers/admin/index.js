import {receiveAdmin, receiveAssignedAuthorities, receiveAuthorityList, receiveRanks} from "../../actions/admin";
import httpclient from "../../utils/httpclient";
import {connect} from "react-redux"
import AdminPage from "../../components/admin";

const mapStateToProps = state => ({
    admin: state.admin,
    ranks: state.ranks,
    authorityList: state.authorityList,
    assignedAuthorities: state.assignedAuthorities
});

const mapDispatchToProps = dispatch => ({
    fetchAdmin: adminId => {
        httpclient.fetch(`/api/admins/${adminId}`)
            .then(resp => resp.json())
            .then(admin => dispatch(receiveAdmin(admin)));
    },

    fetchRanks: () => {
        httpclient.fetch('/api/ranks')
            .then(resp => resp.json())
            .then(ranks => dispatch(receiveRanks(ranks)));
    },

    fetchAuthorityList: () => {
        httpclient.fetch('/api/authorities')
            .then(resp => resp.json())
            .then(authorities => dispatch(receiveAuthorityList(authorities)));
    },

    fetchAssignedAuthorities: adminId => {
        httpclient.fetch(`/api/admins/${adminId}/authorities`)
            .then(resp => resp.json())
            .then(authorityAssignments => dispatch(receiveAssignedAuthorities(authorityAssignments)));
    },

    assignAuthority: (adminId, authorityId) => {
        return httpclient.fetch(`/api/admins/${adminId}/authorities/${authorityId}`, {
            method: 'PUT'
        });
    },

    revokeAuthority: assignmentId => {
        return httpclient.fetch(`/api/authorityAssignments/${assignmentId}`, {
            method: 'DELETE'
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);