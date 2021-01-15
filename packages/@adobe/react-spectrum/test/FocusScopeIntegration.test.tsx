/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {FocusScope} from '@react-aria/focus';
import {Dialog, Item, Picker, Provider, Radio, RadioGroup} from '../';
import React from 'react';
import {render} from '@testing-library/react';
import scaleMedium from '@adobe/spectrum-css-temp/vars/spectrum-medium-unique.css';
import themeLight from '@adobe/spectrum-css-temp/vars/spectrum-light-unique.css';
import userEvent from '@testing-library/user-event';

let theme = {
  light: themeLight,
  medium: scaleMedium
};

describe('tabbing', () => {
  it('should tab past disabled Pickers', () => {
    let {getByTestId} = render(
      <Provider theme={theme}>
        <FocusScope contain autoFocus>
          <RadioGroup label="Landing page">
            <Radio data-testid="first-radio" value="projectList0">List</Radio>
          </RadioGroup>
          <Picker isDisabled label="Select">
            <Item key="123">abc</Item>
          </Picker>
          <RadioGroup label="Landing page">
            <Radio data-testid="second-radio" value="projectList2">List</Radio>
          </RadioGroup>
        </FocusScope>
      </Provider>
    );

    let firstRadio = getByTestId('first-radio');
    let secondRadio = getByTestId('second-radio');
    expect(document.activeElement).toEqual(firstRadio);
    userEvent.tab();
    expect(document.activeElement).toEqual(secondRadio);
  });

  it('should tab past disabled Pickers inside dialogs', () => {
    let {getByTestId} = render(
      <Provider theme={theme}>
        <Dialog>
          <RadioGroup label="Landing page">
            <Radio autoFocus data-testid="first-radio" value="projectList0">List</Radio>
          </RadioGroup>
          <Picker isDisabled label="Select">
            <Item key="123">abc</Item>
          </Picker>
          <RadioGroup label="Landing page">
            <Radio data-testid="second-radio" value="projectList2">List</Radio>
          </RadioGroup>
        </Dialog>
      </Provider>
    );

    let firstRadio = getByTestId('first-radio');
    let secondRadio = getByTestId('second-radio');
    expect(document.activeElement).toEqual(firstRadio);
    userEvent.tab();
    expect(document.activeElement).toEqual(secondRadio);
  });
});
