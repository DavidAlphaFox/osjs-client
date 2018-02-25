/*
 * OS.js - JavaScript Cloud/Web Desktop Platform
 *
 * Copyright (c) 2011-2018, Anders Evenrud <andersevenrud@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @author  Anders Evenrud <andersevenrud@gmail.com>
 * @licence Simplified BSD License
 */

import {h} from 'hyperapp';
import PanelItem from '../panel-item';
import {Menu} from '@osjs/gui';

const defaultIcon = require('../../styles/logo-blue-32x32.png');

const makeTree = (metadata) => {
  const categories = {};

  metadata.forEach((m) => {
    const cat = m.category || '(unknown)'
    if (!categories[cat]) {
      categories[cat] = {
        icon: defaultIcon,
        label: cat,
        items: []
      };
    }

    categories[cat].items.push({
      icon: defaultIcon,
      label: m.name,
      name: m.name
    });
  });

  return Object.values(categories);
};

export default class MenuPanelItem extends PanelItem {

  render(state, actions) {
    const onclick = (item) => {
      const packages = this.core.make('osjs/packages').metadata;

      this.core.make('osjs/contextmenu').show({
        menu: makeTree([].concat(packages)),
        callback: (item) => {
          const {name} = item;

          if (name) {
            this.core.make('osjs/package', name);
          }
        }
      });
    };

    return super.render('menu', [
      h('span', {onclick}, 'Menu')
    ]);
  }

}