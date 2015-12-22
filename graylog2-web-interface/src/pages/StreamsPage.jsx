import React from 'react';
import Reflux from 'reflux';
import { Row } from 'react-bootstrap';

import CreateStreamButton from 'components/streams/CreateStreamButton';
import StreamComponent from 'components/streams/StreamComponent';
import DocumentationLink from 'components/support/DocumentationLink';
import PageHeader from 'components/common/PageHeader';
import { IfPermitted, Spinner } from 'components/common';

import DocsHelper from 'util/DocsHelper';
import CurrentUserStore from 'stores/users/CurrentUserStore';

const StreamsPage = React.createClass({
  mixins: [Reflux.connect(CurrentUserStore)],
  _isLoading() {
    return !this.state.currentUser;
  },
  render() {
    if (this._isLoading()) {
      return <Spinner/>;
    }

    return (
      <div>
        <PageHeader title="Streams">
        <span>You can route incoming messages into streams by applying rules against them. If a
          message
          matches all rules of a stream it is routed into it. A message can be routed into
          multiple
          streams. You can for example create a stream that contains all SSH logins and configure
          to be alerted whenever there are more logins than usual.

          Read more about streams in the <DocumentationLink page={DocsHelper.PAGES.STREAMS} text="documentation"/>.</span>

        <span>
          Take a look at the
          {' '}<DocumentationLink page={DocsHelper.PAGES.EXTERNAL_DASHBOARDS} text="Graylog stream dashboards"/>{' '}
          for wall-mounted displays or other integrations.
        </span>

          <IfPermitted permissions="streams:create">
            <CreateStreamButton ref="createStreamButton" bsSize="large" bsStyle="success" onSave={this._onSave} />
          </IfPermitted>
        </PageHeader>

        <Row className="content">
          <StreamComponent currentUser={this.state.currentUser}/>
        </Row>
      </div>
    );
  },
});

export default StreamsPage;
