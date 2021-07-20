import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

export const ContentLoading = () => (
    <ContentLoader
        width={700}
        height={300}
        viewBox="0 0 700 300"
        backgroundColor="#f5f5f5"
        foregroundColor="#dbdbdb"
        {...props}
    >
        <Rect x="4" y="8" rx="3" ry="3" width="7" height="288" />
        <Rect x="6" y="289" rx="3" ry="3" width="669" height="8" />
        <Rect x="670" y="9" rx="3" ry="3" width="6" height="285" />
        <Rect x="55" y="42" rx="16" ry="16" width="274" height="216" />
        <Rect x="412" y="113" rx="3" ry="3" width="102" height="7" />
        <Rect x="402" y="91" rx="3" ry="3" width="178" height="6" />
        <Rect x="405" y="139" rx="3" ry="3" width="178" height="6" />
        <Rect x="416" y="162" rx="3" ry="3" width="102" height="7" />
        <Rect x="405" y="189" rx="3" ry="3" width="178" height="6" />
        <Rect x="5" y="8" rx="3" ry="3" width="669" height="7" />
        <Rect x="406" y="223" rx="14" ry="14" width="72" height="32" />
        <Rect x="505" y="224" rx="14" ry="14" width="72" height="32" />
        <Rect x="376" y="41" rx="3" ry="3" width="231" height="29" />
    </ContentLoader>
);