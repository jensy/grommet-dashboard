import React from 'react';
import { Box, Text, Menu, Stack } from 'grommet';
import { ThemeContext } from 'grommet/contexts';
import { colorForName, getRGBA } from 'grommet/utils/colors';
import { Notification } from 'grommet-icons';

export default ({ alerts }) => (
  <Menu
    dropAlign={{ top: 'bottom', right: 'right' }}
    items={alerts}
  >
    <ThemeContext.Consumer>
      {theme => (
        <Stack anchor='top-right'>
          <Notification />
          <Box
            direction='row'
            align='center'
            background={getRGBA(colorForName('status-error', theme), 0.9)}
            pad='xsmall'
            style={{
              borderRadius: '50%',
            }}
          >
            <Text
              weight='bold'
              color='white'
              size='xsmall'
              style={{
                lineHeight: 0.8,
                minWidth: '0.6em',
                width: '100%',
                textAlign: 'center',
                verticalAlign: 'middle',
                height: 0,
                paddingBottom: '100%',
              }}
            >
              {alerts.length}
            </Text>
          </Box>
        </Stack>
        )}
    </ThemeContext.Consumer>
  </Menu>
);

