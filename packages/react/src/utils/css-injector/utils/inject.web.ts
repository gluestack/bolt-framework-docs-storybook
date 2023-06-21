import React from 'react';
import { Platform } from 'react-native';

type IWrapperType =
  | 'global'
  | 'boot'
  | 'inline'
  | 'boot-descendant'
  | 'inline-descendant';

type IToBeFlushedStyles = { [key in IWrapperType]?: any };

const toBeFlushedStyles: IToBeFlushedStyles = {
  'global': {},
  'boot': {},
  'boot-descendant': {},
  'inline': {},
  'inline-descendant': {},
};

const order: IWrapperType[] = [
  'global',
  'boot',
  'boot-descendant',
  'inline-descendant',
  'inline',
];

if (typeof window !== 'undefined') {
  //TODO: remvoe platform dependency
  // Test on all the platforms
  if (Platform.OS === 'web') {
    order.forEach((orderKey) => {
      let wrapperElement = document.getElementById(orderKey);

      if (!wrapperElement) {
        wrapperElement = document.createElement('div');
        wrapperElement.id = orderKey;
        document.head.appendChild(wrapperElement);
      }
    });
  }
}

export const injectCss = (
  css: any,
  wrapperType: IWrapperType,
  styleTagId: string
) => {
  // let modifiedStylesheet = {} as any;

  if (!toBeFlushedStyles[wrapperType]) {
    toBeFlushedStyles[wrapperType] = {};
  }
  if (toBeFlushedStyles[wrapperType][styleTagId]) {
    // toBeFlushedStyles[wrapperType][styleTagId].push(css);
  } else {
    toBeFlushedStyles[wrapperType][styleTagId] = [css];
  }

  if (typeof window !== 'undefined') {
    const styleTag = document.getElementById(styleTagId);

    if (!styleTag) {
      // inject(`@media screen {${toBeInjectedCssRules}}`, type, styleTagId);
      // modifiedStylesheet = (() => {
      let style = document.getElementById(styleTagId);
      let wrapperElement = document.getElementById(wrapperType);

      if (!style) {
        style = document.createElement('style');
        style.id = styleTagId;
        style.appendChild(document.createTextNode(''));
        style.innerHTML = css;

        // console.log(css, style, 'KKKKKK');
      }

      if (wrapperElement) {
        wrapperElement.appendChild(style);
      }
    }
    //  else {
    //   if (wrapperType === 'global') {
    //     const style = document.getElementById(styleTagId);
    //     const sheet = style?.sheet;
    //     sheet?.insertRule(css);
    //   }
    // }
    // @ts-ignore
    // return style.sheet;
    // })();
  }

  // if (modifiedStylesheet && modifiedStylesheet.insertRule) {
  //   modifiedStylesheet.insertRule(css);
  // }
};
export const injectGlobalCss = (
  css: any,
  styleTagID: string = 'css-injected-global'
) => {
  injectCss(css, 'global', styleTagID);
};

export const flush = () => {
  let toBeFlushedStylesGlobal = [] as any;

  order.forEach((orderKey) => {
    const styleChildren: any = [];
    Object.keys(toBeFlushedStyles[orderKey]).forEach((styleTagId) => {
      let rules = toBeFlushedStyles[orderKey][styleTagId];
      styleChildren.push(
        React.createElement('style', {
          id: styleTagId,
          key: styleTagId,
          dangerouslySetInnerHTML: {
            __html: rules.join('\n'),
          },
        })
      );
    });

    toBeFlushedStylesGlobal.push(
      React.createElement(
        'div',
        {
          id: orderKey,
          key: orderKey,
        },
        styleChildren
      )
    );
  });
  // Object.keys(toBeFlushedStyles).map(() => {

  // })

  // Object.keys(toBeFlushedStyles['boot']).map((styleTagId) => {
  //   let rules = toBeFlushedStyles['boot'][styleTagId];
  //   toBeFlushedStylesGlobal.push(
  //     React.createElement('style', {
  //       id: styleTagId,
  //       key: styleTagId,
  //       dangerouslySetInnerHTML: {
  //         __html: rules.join('\n'),
  //       },
  //     })
  //   );
  // });
  // Object.keys(toBeFlushedStyles['inline']).map((styleTagId) => {
  //   let rules = toBeFlushedStyles['inline'[styleTagId];
  //   toBeFlushedStylesGlobal.push(
  //     React.createElement('style', {
  //       id: styleTagId,
  //       key: styleTagId,
  //       dangerouslySetInnerHTML: {
  //         __html: rules.join('\n'),
  //       },
  //     })
  //   );
  // });

  return toBeFlushedStylesGlobal;
};
