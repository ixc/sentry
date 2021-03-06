import $ from "jquery";
import React from "react";
import {History} from "react-router";
import api from "../api";
import Gravatar from "../components/gravatar";
import GroupState from "../mixins/groupState";
import LoadingError from "../components/loadingError";
import LoadingIndicator from "../components/loadingIndicator";
import TimeSince from "../components/timeSince";
import utils from "../utils";

var GroupUserReports = React.createClass({
  mixins: [
    GroupState,
    History
  ],

  getInitialState() {
    return {
      loading: true,
      error: false,
      reportList: [],
      pageLinks: '',
    };
  },

  componentWillMount() {
    this.fetchData();
  },

  fetchData() {
    var queryParams = this.props.params;
    var querystring = $.param(queryParams);

    this.setState({
      loading: true,
      error: false
    });

    api.request('/groups/' + this.getGroup().id + '/user-reports/?' + querystring, {
      success: (data, _, jqXHR) => {
        this.setState({
          error: false,
          loading: false,
          reportList: data,
          pageLinks: jqXHR.getResponseHeader('Link')
        });
      },
      error: (error) => {
        this.setState({
          error: true,
          loading: false
        });
      }
    });
  },

  onPage(cursor) {
    var queryParams = $.extend({}, this.props.location.query, {cursor: cursor});

    let {orgId, projectId, groupId} = this.props.params;
    this.history.pushState(
      null,
      `/${orgId}/${projectId}/group/${groupId}/reports/`,
      queryParams
    );
  },

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    } else if (this.state.error) {
      return <LoadingError onRetry={this.fetchData} />;
    }

    var children = this.state.reportList.map((item, itemIdx) => {
      var body = utils.nl2br(utils.urlize(utils.escape(item.comments)));

      return (
        <li className="activity-note" key={itemIdx}>
          <Gravatar email={item.email} size={64} className="avatar" />
          <div className="activity-bubble">
            <TimeSince date={item.dateCreated} />
            <div className="activity-author">{item.name} <small>{item.email}</small></div>
            <p dangerouslySetInnerHTML={{__html: body}} />
          </div>
        </li>
      );
    });

    if (children.length) {
      return (
        <div className="row">
          <div className="col-md-9">
            <div className="activity-container">
              <ul className="activity">
                {children}
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="box empty-stream">
        <span className="icon icon-exclamation" />
        <p>No user reports have been collected for this event.</p>
        <p><a href="">Learn how to integrate User Crash Reports</a></p>
      </div>
    );
  }
});

export default GroupUserReports;
