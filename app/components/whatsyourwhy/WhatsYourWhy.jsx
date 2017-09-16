var React = require('react');
var Item = require('Item');
var services = require('Services');
var Loading = require('Loading');
var {Link, IndexLink} = require('react-router');

var WhatsYourWhy = React.createClass({

  getInitialState: function() {
    return {
      isLoading: true,
      data: []
    };
  },
  getDefaultProps: function() {
    return {
      isLoading: true,
      data: []
    };
  },
  getList: function() {
    var that = this;
    services.getFamousBlog().then(function (data) {
      that.setState({
        data: data,
        isLoading: false
      });
    });
  },
  render: function() {
      var {isLoading, data} = this.state;
      var {home} = this.props;

      var renderButton = () => {
        if (home === true) {
          return (<Link to="/blog" className="button-line" maintainScrollPosition={true}>ดูบทความทั้งหมด</Link>)
        }
      }

      if (isLoading) {
        return (
          <div id="whats-your-why">
              <h2>พบกับ #whatsyourwhy ของคนดัง</h2>
                <div className="grid-x grid-margin-x">
                  <Loading />
                </div>
          </div>
        )
      } else {
        var renderList = () => {
          return data.map((blog) => {
            return <Item key={blog.id} {...blog}/>
          });
        };

        return (
          <div id="blog">
              <h2>พบกับ #whatsyourwhy ของคนดัง</h2>
                <div className="grid-x grid-margin-x">
                  {renderList()}
                </div>
                {renderButton()}
          </div>
        )
      }


  },
  componentDidMount: function() {
    {this.getList()}
  }
});

module.exports = WhatsYourWhy;
