import React from "react";

import PropTypes from "../../proptypes";
import {objectToArray} from "../../utils";
import EventDataSection from "./eventDataSection";
import DefinitionList from "./interfaces/definitionList";

var EventExtraData = React.createClass({
  propTypes: {
    group: PropTypes.Group.isRequired,
    event: PropTypes.Event.isRequired
  },

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.event.id !== nextProps.event.id;
  },

  render() {
    let extraDataArray = objectToArray(this.props.event.context);

    return (
      <EventDataSection
          group={this.props.group}
          event={this.props.event}
          type="extra"
          title="Additional Data">
          <DefinitionList
              data={extraDataArray}
              isContextData={true}/>
      </EventDataSection>
    );
  }
});

export default EventExtraData;
