local manifest = import 'core/manifest.libsonnet';
local utils = import 'core/utils.libsonnet';

local icons() = {
  [size]: 'icon.png'
  for size in ['16', '48', '128']
};

local json = manifest.new(
  name='R Search Extension',
  version='0.1',
  keyword='r',
  description='Search R docs and third packages in your address bar instantly!',
)
             .addIcons(icons())
             .addBackgroundScripts(['command/help.js', 'main.js']);

if std.extVar('browser') == 'firefox' then
  json
  {
    browser_specific_settings: {
      gecko: {
        id: '{bb3394f3-9a10-4b30-ae77-6cc6fd51de99}',
      },
    },
  }
else
  json
