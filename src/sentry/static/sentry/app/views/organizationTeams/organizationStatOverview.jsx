import React from "react";
import {Link} from "react-router";
import classNames from "classnames";

import api from "../../api";
import OrganizationState from "../../mixins/organizationState";

import {defined} from "../../utils";

var OrganizationStatOverview = React.createClass({
  mixins: [
    OrganizationState
  ],

  propTypes: {
    orgId: React.PropTypes.string
  },

  contextTypes: {
    location: React.PropTypes.object
  },

  getInitialState() {
    return {
      totalRejected: null,
      epm: null
    };
  },

  componentWillMount() {
    this.fetchData();
  },

  getOrganizationStatsEndpoint() {
    return '/organizations/' + this.props.orgId + '/stats/';
  },

  fetchData() {
    var statsEndpoint = this.getOrganizationStatsEndpoint();
    api.request(statsEndpoint, {
      query: {
        since: new Date().getTime() / 1000 - 3600 * 24,
        stat: 'rejected'
      },
      success: (data) => {
        var totalRejected = 0;
        data.forEach((point) => {
          totalRejected += point[1];
        });
        this.setState({totalRejected: totalRejected});
      }
    });
    api.request(statsEndpoint, {
      query: {
        since: new Date().getTime() / 1000 - 3600 * 3,
        resolution: '1h',
        stat: 'received'
      },
      success: (data) => {
        var received = [0, 0];
        data.forEach((point) => {
          if (point[1] > 0) {
            received[0] += point[1];
            received[1] += 1;
          }
        });
        var epm = (received[1] ? parseInt((received[0] / received[1]) / 60, 10) : 0);
        this.setState({epm: epm});
      }
    });
  },

  render() {
    if (!defined(this.state.epm) || !defined(this.state.totalRejected))
      return null;

    var access = this.getAccess();

    var rejectedClasses = ['count'];
    if (this.state.totalRejected > 0)
      rejectedClasses.push('rejected');

    return (
      <div className={this.props.className}>
        <h6 className="nav-header">Events Per Minute</h6>
        <p className="count">{this.state.epm}</p>
        <h6 className="nav-header">Rejected in last 24h</h6>
        <p className={classNames(rejectedClasses)}>{this.state.totalRejected}</p>
        {access.has('org:read') &&
          <Link to={`/organizations/${this.props.orgId}/stats/`} className="stats-link">
            View all stats
          </Link>
        }
      </div>
    );
  }
});

export default OrganizationStatOverview;
