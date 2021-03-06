import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Paragraph, Image } from 'grommet';
import { Favorite } from 'grommet-icons';
import RoutedAnchor from '../RoutedAnchor';
import { Card } from '../Card';
import IconButton from '../IconButton/IconButton';
import Avatar from '../profiles/Avatar';

const HorizontalPost = ({
  image, title, authorName, authorImage, authorDescription, path, excerpt, icons = [],
}) => {
  let img;
  if (image) {
    img = (
      <Box width='small' flex={false}>
        <Image
          fit='cover'
          src={image}
        />
      </Box>
    );
  }
  return (
    <Card>
      <Box basis='small' direction='row' flex={false} fill='horizontal'>
        {img}
        <Box pad='medium' justify='between' fill='horizontal'>
          <Box>
            <RoutedAnchor path={path}>
              <Heading level={3} margin='none'>
                {title}
              </Heading>
            </RoutedAnchor>
            <Paragraph
              size='small'
              style={{
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {excerpt}
            </Paragraph>
          </Box>
          <Box direction='row' justify='between' >
            <Avatar
              image={authorImage}
              name={authorName}
              description={authorDescription}
            />
            {icons.map((icon, idx) => (
              <IconButton key={`title_${idx}`} {...icon} />
            ))}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

HorizontalPost.defaultProps = {
  image: undefined,
  authorDescription: undefined,
  path: undefined,
  excerpt: undefined,
  icons: [{ icon: <Favorite /> }],
};
HorizontalPost.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorImage: PropTypes.string.isRequired,
  authorDescription: PropTypes.string,
  path: PropTypes.string,
  excerpt: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.object),
};
export default HorizontalPost;
