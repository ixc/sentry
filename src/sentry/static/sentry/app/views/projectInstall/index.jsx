import React from "react";

import api from "../../api";
import LoadingError from "../../components/loadingError";
import LoadingIndicator from "../../components/loadingIndicator";

const ProjectInstall = React.createClass({
  propTypes: {
    setProjectNavSection: React.PropTypes.func
  },

  componentWillMount() {
    this.props.setProjectNavSection('settings');
  },

  componentDidMount() {
    this.fetchData();
  },

  getInitialState() {
    return {
      loading: true,
      platformList: null
    };
  },

  fetchData() {
    let {orgId, projectId} = this.props.params;
    api.request(`/projects/${orgId}/${projectId}/docs/`, {
      success: (data) => {
        this.setState({
          loading: false,
          data: data
        });
      }
    });
  },

  render() {
    if (this.state.loading)
      return <LoadingIndicator />;
    else if (this.state.error)
      return <LoadingError onRetry={this.fetchData} />;

    let data = this.state.data;
    return React.cloneElement(this.props.children, {
      platformData: data // {...this.props}
    });
  }
});

export default ProjectInstall;
