import React from 'react';
import classnames from 'classnames'


interface IProps {
    src: string;
    alt?: string;
    circle?: boolean;
    rounded?: boolean;
    width?: number;
    height?: number;
}


const Thumbnail = (props: IProps) => {

    const {
        src,
        alt='thumbnail',
        circle=false,
        rounded=false,
        width=40,
        height=40
    } = props;
    const classes = classnames('mx-auto', 'd-block', {
        'rounded': rounded,
        'img-circle': circle,
    })
    return(
        <img className={classes} width={width} height={height} src={src} alt={alt}/>
    )
}


export { Thumbnail };