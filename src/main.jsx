import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Accordion from './accordion.jsx';

ReactDOM.render(
    <AppContainer>
        <Accordion/>
    </AppContainer>,
    document.querySelector('.root')
);