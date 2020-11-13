import React from 'react';
import { Provider } from 'react-redux';

import { render, fireEvent, screen, wait } from '@testing-library/react';
import DetailComment from './DetailComment';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
