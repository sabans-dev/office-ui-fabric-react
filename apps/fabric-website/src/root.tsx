import { registerIcons, on, KeyCodes } from 'office-ui-fabric-react';
import { initializeFileTypeIcons } from '@uifabric/file-type-icons';
import { createSite } from './utilities/createSite';
import * as platformPickerStyles from '@uifabric/example-app-base/lib/components/PlatformPicker/PlatformPicker.module.scss';
import { SiteDefinition } from './SiteDefinition/index';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { AndroidLogo, AppleLogo, WebLogo } from './utilities/index';

// TODO: handle redirects

initializeFileTypeIcons('https://static2.sharepointonline.com/files/fabric/assets/item-types-fluent/');

registerIcons({
  icons: {
    'AndroidLogo-platformPicker': AndroidLogo({
      className: platformPickerStyles.icon
    }),
    'AppleLogo-platformPicker': AppleLogo({
      className: platformPickerStyles.icon
    }),
    'WebLogo-platformPicker': WebLogo({
      className: platformPickerStyles.icon
    })
  }
});

const skipToMain = document.getElementById('uhfSkipToMain') as HTMLAnchorElement;
if (skipToMain) {
  // This link points to #mainContent by default, which would be interpreted as a route in our app.
  // Handle focusing the main content manually instead.
  const focusMainContent = (ev: Event) => {
    ev.preventDefault(); // don't navigate

    // focus content root
    const mainContent = document.querySelector('[data-app-content-div="true"]') as HTMLDivElement | null;
    if (mainContent) {
      mainContent.focus();
    }
  };

  on(skipToMain, 'click', focusMainContent);
  on(skipToMain, 'keydown', (ev: KeyboardEvent) => {
    if (ev.which === KeyCodes.enter) {
      focusMainContent(ev);
    }
  });
}

createSite(SiteDefinition, [NotFoundPage, HomePage]);
