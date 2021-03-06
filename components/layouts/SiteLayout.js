import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { bindActionCreators } from 'redux';
import Head from 'next/head';
import { Grommet, Box } from 'grommet';
import { ResponsiveContext } from 'grommet/contexts';
import Header from './Header';
import Footer from './Footer';
import Notifications from './Notifications';
import connect from '../../redux/index';
import { selectTheme } from '../../redux/themes/actions';

class SiteLayout extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.changeTheme(props.router.query.theme);
  }

  changeTheme(theme) {
    this.theme = theme;
    this.props.selectTheme(theme);
  }

   onChangeTheme = (theme) => {
     const { router } = this.props;
     const path = { pathname: router.pathname, query: { ...router.query, theme } };
     this.changeTheme(theme);
     router.replace(path, path, { shallow: true });
   };


   componentWillReceiveProps(nextProps) {
     if (nextProps.router.query.theme !== this.theme) {
       this.props.selectTheme(nextProps.router.query.theme);
     }
   }

   render() {
     const {
       children, title: pageTitle, description, themes: { themes },
     } = this.props;
     const keywords = ['grommet', 'grommet 2', 'react', 'next-js', 'next.js', 'dashboard', 'npm'];
     if (pageTitle) {
       keywords.push(pageTitle);
     }
     return (
       <div>
         <Head>
           {pageTitle && (
           <title>{`Grommet Dashboard - ${pageTitle}`}</title>
            )
          }
           {typeof description === 'string' && (
           <meta name='description' content={description} />
            )
          }
           <meta name='keywords' content={keywords.join(',')} />
         </Head>
         <Grommet theme={themes[this.theme] || themes.light} style={{ height: 'auto', minHeight: '100vh' }}>
           <ResponsiveContext.Consumer >
             {size => (
               <Box style={{ height: 'auto', minHeight: '100vh' }}>
                 <Header title={pageTitle} onChangeTheme={this.onChangeTheme} size={size} />
                 <Notifications />
                 <Box flex={true} background='light-1' pad={{ horizontal: size === 'narrow' ? 'small' : 'xlarge', vertical: 'large' }}>
                   {children}
                 </Box>
                 <Footer />
               </Box>
              )}
           </ResponsiveContext.Consumer>
         </Grommet>
       </div>
     );
   }
}

SiteLayout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

SiteLayout.defaultProps = {
  description: undefined,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectTheme }, dispatch);

const mapStateToProps = state => ({
  themes: state.themes,
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteLayout));

