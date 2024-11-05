import React, { useState, Children, cloneElement, ReactElement } from 'react';
import { View } from 'react-native';
import { Formik, FormikValues, FormikConfig, FormikProps } from 'formik';
import useMount from 'react-use/lib/useMount';

import isFunction from '@utils/isFunction';
import Button from '@components/Button';
import Text from '@components/Text';

import styles from './styles';
import { Colors } from '@styles';

interface WizardProps {
  initialValues: FormikValues;
  innerRef?: (instance: WizardElement) => void;
}

interface PageProps
  extends Omit<FormikConfig<FormikValues>, 'initialValues' | 'onSubmit'> {
  title: string;
  icon?: React.ReactNode;
  onSubmit?: (values: any) => void;
  children:
    | React.ReactNode
    | ((props: WizardPageProps<FormikValues>) => React.ReactNode);
}

interface WizardActions {
  previous: () => void;
  next: (values: any) => void;
  goTo: (index: number) => void;
}

export interface WizardElement extends WizardActions {}

export interface WizardPageProps<T> extends FormikProps<T>, WizardActions {}

interface InjectedProps extends PageProps {
  parentProps: WizardPageProps<FormikValues>;
}

type Page = React.FC<PageProps>;

type Wizard = React.FC<WizardProps> & {
  Page: Page;
};

const Page: React.FC<InjectedProps> = ({ children, parentProps }) => (
  <>{isFunction(children) ? children(parentProps) : children}</>
);

const Wizard: Wizard = ({ initialValues, children, innerRef }) => {
  const pages = Children.toArray(children) as { props: PageProps }[];

  const [state, setState] = useState({
    page: 0,
    values: initialValues,
    success: Array.from(pages, (_, index) => index === 0),
  });

  useMount(() => {
    innerRef && innerRef({ goTo, next, previous });
  });

  const activePage = pages[state.page];

  const previous = () =>
    setState(prev => ({ ...prev, page: Math.max(prev.page - 1, 0) }));

  const next = (values: object) => {
    const nextPage = Math.min(state.page + 1, pages.length - 1);

    setState(prev => ({
      page: nextPage,
      values: { ...prev.values, ...values },
      success: prev.success.map((page, index) => index === nextPage || page),
    }));
  };

  const goTo = (page: number) => setState(prev => ({ ...prev, page }));

  const handleSubmit = (values: object) => {
    activePage.props.onSubmit && activePage.props.onSubmit(values);
    next(values);
  };

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      {...activePage.props}
      onSubmit={handleSubmit}
      initialValues={initialValues}
    >
      {props => (
        <>
          <View style={styles.progress}>
            {pages.map((child, index) => {
              const active = index === state.page;
              const hasIcon = !!child.props.icon;
              const Icon = child.props.icon as any;
              return (
                <Button
                  uppercase
                  key={index}
                  style={[styles.item, active && styles.itemActive]}
                  onPress={state.success[index] ? () => goTo(index) : undefined}
                  title={
                    hasIcon ? (
                      <Icon
                        width={30}
                        height={30}
                        fill={active ? Colors.Black : Colors.BaliHai}
                        backgroundColor="#fff"
                      />
                    ) : (
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        uppercase
                        fontWeight="bold"
                        fontSize="medium"
                        color={active ? 'dark' : 'secondary'}
                      >
                        {child.props.title}
                      </Text>
                    )
                  }
                />
              );
            })}
          </View>
          {cloneElement(activePage as ReactElement<InjectedProps>, {
            parentProps: { ...props, goTo, next, previous },
          })}
        </>
      )}
    </Formik>
  );
};

Wizard.Page = Page as Page;

export default Wizard;
