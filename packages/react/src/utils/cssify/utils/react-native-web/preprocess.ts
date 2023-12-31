import normalizeColor from './normalizeColor';
import normalizeValueWithProperty from './normalizeValueWithProperty';
import { CSSPropertiesMap } from '../../../../core/styled-system';
const defaultOffset = { height: 0, width: 0 };

export const createBoxShadowValue = (style: any): void | string => {
  const { shadowColor, shadowOffset, shadowOpacity, shadowRadius } = style;
  const { height, width } = shadowOffset || defaultOffset;
  const offsetX = normalizeValueWithProperty(width);
  const offsetY = normalizeValueWithProperty(height);
  const blurRadius = normalizeValueWithProperty(shadowRadius || 0);
  const color = normalizeColor(shadowColor || 'black', shadowOpacity);
  if (
    color != null &&
    offsetX != null &&
    offsetY != null &&
    blurRadius != null
  ) {
    return `${offsetX} ${offsetY} ${blurRadius} ${color}`;
  }
};

export const createTextShadowValue = (style: any): void | string => {
  const { textShadowColor, textShadowOffset, textShadowRadius } = style;
  const { height, width } = textShadowOffset || defaultOffset;
  const radius = textShadowRadius || 0;
  const offsetX = normalizeValueWithProperty(width);
  const offsetY = normalizeValueWithProperty(height);
  const blurRadius = normalizeValueWithProperty(radius);
  const color = normalizeValueWithProperty(textShadowColor, 'textShadowColor');

  if (
    color &&
    (height !== 0 || width !== 0 || radius !== 0) &&
    offsetX != null &&
    offsetY != null &&
    blurRadius != null
  ) {
    return `${offsetX} ${offsetY} ${blurRadius} ${color}`;
  }
};
const getResetValue = (propName: string, propValue: string) => {
  // @ts-ignore
  return CSSPropertiesMap[propName] || propValue;
};
/**
 * Preprocess styles
 */
export const preprocess = (originalStyle: any) => {
  const style = originalStyle || {};
  const nextStyle: any = {};
  for (const originalProp in style) {
    const originalValue =
      typeof style[originalProp] !== 'undefined'
        ? style[originalProp]
        : getResetValue(originalProp, style[originalProp]);

    let prop = originalProp;
    let value = originalValue;

    if (
      !Object.prototype.hasOwnProperty.call(style, originalProp) ||
      originalValue == null
    ) {
      continue;
    }

    if (prop === 'elevation') continue;
    // Convert shadow styles
    if (
      prop === 'shadowColor' ||
      prop === 'shadowOffset' ||
      prop === 'shadowOpacity' ||
      prop === 'shadowRadius'
    ) {
      const boxShadowValue = createBoxShadowValue(style);

      if (boxShadowValue != null && nextStyle.boxShadow == null) {
        const { boxShadow } = style;
        prop = 'boxShadow';
        value = boxShadow ? `${boxShadow}, ${boxShadowValue}` : boxShadowValue;
      } else {
        continue;
      }
    }

    // Convert text shadow styles
    if (
      prop === 'textShadowColor' ||
      prop === 'textShadowOffset' ||
      prop === 'textShadowRadius'
    ) {
      const textShadowValue = createTextShadowValue(style);
      if (textShadowValue != null && nextStyle.textShadow == null) {
        const { textShadow } = style;
        prop = 'textShadow';
        value = textShadow
          ? `${textShadow}, ${textShadowValue}`
          : textShadowValue;
      } else {
        continue;
      }
    }

    nextStyle[prop] = value;
  }

  // $FlowIgnore
  return nextStyle;
};
