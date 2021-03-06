import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

import DefinitionList from "app/components/events/interfaces/definitionList";

describe('DefinitionList', function () {
  describe("render", function () {
    it("should render a definition list of key/value pairs", function () {
      var data = [
        ['a', 'x'], ['b', 'y']
      ];
      var elem = TestUtils.renderIntoDocument(<DefinitionList data={data} />);

      var dts = TestUtils.scryRenderedDOMComponentsWithTag(elem, 'dt');
      expect(ReactDOM.findDOMNode(dts[0]).textContent).to.eql('a');
      expect(ReactDOM.findDOMNode(dts[1]).textContent).to.eql('b');

      var dds = TestUtils.scryRenderedDOMComponentsWithTag(elem, 'dd');
      expect(ReactDOM.findDOMNode(dds[0]).textContent).to.eql('x');
      expect(ReactDOM.findDOMNode(dds[1]).textContent).to.eql('y');
    });

    it("should sort sort key/value pairs", function () {
      var data = [
        ['b', 'y'], ['a', 'x']
      ];
      var elem = TestUtils.renderIntoDocument(<DefinitionList data={data} />);

      var dts = TestUtils.scryRenderedDOMComponentsWithTag(elem, 'dt');
      expect(ReactDOM.findDOMNode(dts[0]).textContent).to.eql('a');
      expect(ReactDOM.findDOMNode(dts[1]).textContent).to.eql('b');

      var dds = TestUtils.scryRenderedDOMComponentsWithTag(elem, 'dd');
      expect(ReactDOM.findDOMNode(dds[0]).textContent).to.eql('x');
      expect(ReactDOM.findDOMNode(dds[1]).textContent).to.eql('y');
    });

    it("should use a single space for values that are an empty string", function () {
      var data = [
        ['b', 'y'], ['a', ''] // empty string
      ];
      var elem = TestUtils.renderIntoDocument(<DefinitionList data={data} />);

      var dts = TestUtils.scryRenderedDOMComponentsWithTag(elem, 'dt');
      expect(ReactDOM.findDOMNode(dts[0]).textContent).to.eql('a');
      expect(ReactDOM.findDOMNode(dts[1]).textContent).to.eql('b');

      var dds = TestUtils.scryRenderedDOMComponentsWithTag(elem, 'dd');
      expect(ReactDOM.findDOMNode(dds[0]).textContent).to.eql(' ');
      expect(ReactDOM.findDOMNode(dds[1]).textContent).to.eql('y');
    });

    it("should coerce non-strings into strings", function () {
      var data = [
        ['a', false]
      ];
      var elem = TestUtils.renderIntoDocument(<DefinitionList data={data} />);

      var dts = TestUtils.scryRenderedDOMComponentsWithTag(elem, 'dt');
      expect(ReactDOM.findDOMNode(dts[0]).textContent).to.eql('a');

      var dds = TestUtils.scryRenderedDOMComponentsWithTag(elem, 'dd');
      expect(ReactDOM.findDOMNode(dds[0]).textContent).to.eql('false');
    });

    it("shouldn't blow up on null", function () {
      var data = [
        ['a', null]
      ];
      var elem = TestUtils.renderIntoDocument(<DefinitionList data={data} />);

      var dts = TestUtils.scryRenderedDOMComponentsWithTag(elem, 'dt');
      expect(ReactDOM.findDOMNode(dts[0]).textContent).to.eql('a');

      var dds = TestUtils.scryRenderedDOMComponentsWithTag(elem, 'dd');
      expect(ReactDOM.findDOMNode(dds[0]).textContent).to.eql('null');
    });
  });
});

