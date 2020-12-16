import * as React from 'react';
import renderer from 'react-test-renderer';
import ErrorView from './error';

test('Renders passed message', () => {
    const tree = renderer
        .create(<ErrorView errorMessage={'Test error message'} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test('Renders default message', () => {
    const tree = renderer.create(<ErrorView />).toJSON();
    expect(tree).toMatchSnapshot();
});
