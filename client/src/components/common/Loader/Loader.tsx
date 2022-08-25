import React, { FC } from 'react';
import classes from './Loader.module.scss';

/** Компонент лоадера */
const Loader: FC = () => {
  return (
    <div className={classes.loader__wrapper}>
      <div className={classes.loader__content}></div>
    </div>
  );
};

export default Loader;
