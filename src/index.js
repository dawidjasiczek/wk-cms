
// FORM
import WkInput from './components/Form/Input'
import WkButtonsGroup from './components/Form/ButtonsGroup'
import WkCheckbox from './components/Form/Checkbox'
import WkFileInput from './components/Form/FileInput'
import WkRadio from './components/Form/Radio'
import WkMultiSelect from './components/Form/MultiSelect'
import WkSearchSelect from './components/Form/SearchSelect'
import WkSwitch from './components/Form/Switch'
import WkSelect from './components/Form/Select'
import WkRadioGroup from './components/Form/RadioGroup'

// FORM/EDITOR
import WkEditor from './components/Form/Editor/Editor'
import WkTableEditor from './components/Form/Editor/TableEditor'

// FORM/WYSWIG
import WkWysiwyg from './components/Form/Wysiwyg/Wysiwyg'

// Filemanager
import WkFileManager from './components/Filemanager/FileManager'

// Layout
import WkTag from './components/Layout/Tag'
import WkButton from './components/Layout/Button'
import WkModal from './components/Layout/Modal/Modal'
import WkHeader from './components/Layout/Header'
import WkAlert from './components/Layout/Alert'
import WkViewport from './components/Layout/Viewport'
import WkLoginView from './components/Layout/LoginView'

// Layout Grid
import WkRow from './components/Layout/Grid/Row'
import WkCol from './components/Layout/Grid/Col'
// Layout Tabs
import WkTabs from './components/Layout/Tabs/Tabs'
import WkTabsPane from './components/Layout/Tabs/TabsPane'

// Layout Tabs
import WkTable from './components/Layout/Table/Table'
import WkTableCol from './components/Layout/Table/TableCol'

// Layout Menubar
import WkMenubarGroup from './components/Layout/Menubar/MenubarGroup'
import WkMenubarOption from './components/Layout/Menubar/MenubarOption'
import WkMenubarOptionsGroup from './components/Layout/Menubar/MenubarOptionsGroup'

// Others
import WkAnimatedCollapse from './components/Others/AnimatedCollapse'
import WkSpinner from './components/Others/Spinner'
import WkCollapse from './components/Others/Collapse'
import WkContextMenu from './components/Others/ContextMenu'
import WkHint from './components/Others/Hint'
import WkPagination from './components/Others/Pagination'
import WkSeoChecker from './components/Others/SeoChecker'
import WkTooltip from './components/Others/Tooltip'
import WkCaret from './components/Others/Caret'
import WkConfirm from './components/Others/Confirm'
import WkTamerUpdater from './components/Others/TamerUpdater'

// Special
import WkFormsEditor from './components/Special/FormsEditor'

import MessageBox from './components/Layout/Modal/MessageBox';


//Dodatkowe
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas);


import vClickOutside from 'v-click-outside'

const WkCMS = {
    install(Vue, options) {

        
       Vue.component('fa-icon', FontAwesomeIcon);


       //FORM
       Vue.component('WkInput', WkInput);
       Vue.component('WkButtonsGroup', WkButtonsGroup);
       Vue.component('WkCheckbox', WkCheckbox);
       Vue.component('WkFileInput', WkFileInput);
       Vue.component('WkRadio', WkRadio);
       Vue.component('WkMultiSelect', WkMultiSelect);
       Vue.component('WkSearchSelect', WkSearchSelect);
       Vue.component('WkSwitch', WkSwitch);
       Vue.component('WkSelect', WkSelect);
       Vue.component('WkRadioGroup', WkRadioGroup);

       Vue.component('WkEditor', WkEditor);
       Vue.component('WkTableEditor', WkTableEditor);

       Vue.component('WkWysiwyg', WkWysiwyg);

       Vue.component('WkFileManager', WkFileManager);

       // LAYOUT
       Vue.component('WkTag', WkTag);
       Vue.component('WkButton', WkButton);
       Vue.component('WkModal', WkModal);
       Vue.component('WkHeader', WkHeader);
       Vue.component('WkAlert', WkAlert);

       Vue.component('WkRow', WkRow);
       Vue.component('WkCol', WkCol);

       Vue.component('WkViewport', WkViewport);
       Vue.component('WkLoginView', WkLoginView);
       Vue.component('WkTabs', WkTabs);
       Vue.component('WkTabsPane', WkTabsPane);

       Vue.component('WkTable', WkTable);
       Vue.component('WkTableCol', WkTableCol);

       Vue.component('WkMenubarGroup', WkMenubarGroup);
       Vue.component('WkMenubarOption', WkMenubarOption);
       Vue.component('WkMenubarOptionsGroup', WkMenubarOptionsGroup);

       // others
       Vue.component('WkAnimatedCollapse', WkAnimatedCollapse);
       Vue.component('WkSpinner', WkSpinner);
       Vue.component('WkCollapse', WkCollapse);
       Vue.component('WkContextMenu', WkContextMenu);
       Vue.component('WkHint', WkHint);
       Vue.component('WkPagination', WkPagination);
       Vue.component('WkSeoChecker', WkSeoChecker);
       Vue.component('WkTooltip', WkTooltip);
       Vue.component('WkCaret', WkCaret);
       Vue.component('WkConfirm', WkConfirm);

       Vue.component('WkFormsEditor', WkFormsEditor);

       Vue.component('WkTamerUpdater', WkTamerUpdater);

       Vue.use(MessageBox);
       Vue.use(vClickOutside)
    }
   };
   
   // Automatic installation if Vue has been added to the global scope.
   if (typeof window !== 'undefined' && window.Vue) {
       window.Vue.use(WkCMS);
   }
   
   export default WkCMS;