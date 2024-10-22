import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class HomeFooter extends Component {
    render() {

        return (
            <div className="home-footer">
                <p>&copy; 2021 Hỏi Dân IT với Eric. More information, please visit my youtube channel.
                    <a target="_blank" href="https://www.youtube.com/watch?v=VznptsZ9QZU&list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI">
                        &#8594; Click here &#8592;
                    </a>
                </p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
