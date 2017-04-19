import React from 'react';
import {Form} from 'Form';
import {Message} from 'Message';
import myApi from 'myApi';
import uuid from 'uuid/v1';

export class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch (location) {
    var that = this;

    var list;
    if (this.state.list){
      list = that.state.list;
    } else {
      list = [];
    }

    this.setState({
      isLoading: true,
      errorMessage: undefined,
      list: list
    });

    myApi.getTemp(location).then(function (data) {

      var newList = that.state.list.concat([[data.name, data.temp]]);

      that.setState({
        isLoading: false,
        list: newList
      });
    }, function (e) {
      that.setState({
        isLoading: false,
        errorMessage: e.message
      });
    });
  }

  render () {
    console.log('this.state:', this.state);
    var {isLoading, errorMessage, list} = this.state;

    function loadingMessage () {
      if (isLoading) {
        return (
          <tr>
            <td>Loading...</td>
            <td>Loading...</td>
          </tr>

        )
      }
    }

    function renderMessages () {
      if (list) {
        return list.map((message) => {
          return (
            <Message key={uuid()} location={message[0]} temp={message[1]}/>
          )
        })
      }
    }

    function renderError () {
      if (typeof errorMessage === 'string') {
        alert(errorMessage)
      }
    }

    function table () {
      if (list) {
        return (
        <table>
          <tbody>
          <tr className="message">
            <th>
              City
            </th>
            <th>
              Temperature
            </th>
          </tr>
            {renderMessages()}
            {loadingMessage()}
          </tbody>
        </table>
        )
      }
    }

    return (
      <div className="row">
          <div className="page-title">Get Weather</div>
          <Form onSearch={this.handleSearch}/>
          {table()}
          {renderError()}
      </div>
    );
  }
}
