import Vue from 'vue';
import vueTemplate from './MessageBoxTemplate';

const ElementConstructor = Vue.extend(vueTemplate);

let instance, resolve, reject = null;

function cleanInstance(){
    instance.show = false;
    setTimeout(_ => {
        document.body.removeChild(instance.$el);
        instance.$destroy();
        instance = null;
    }, 200);
}

const MessageBox = (options) => {

    if (Vue.prototype.$isServer) return;

    if(!options) options = {};

    if(!instance){
        instance = new ElementConstructor({
            el: document.createElement('div')
        });
    }

    if(options.confirmButtonText && typeof options.confirmButtonText == 'string'){
        instance.confirmButtonText = options.confirmButtonText;
    }
    if(options.cancelButtonText && typeof options.cancelButtonText == 'string'){
        instance.cancelButtonText = options.cancelButtonText;
    }
    if(options.confirmButtonType && typeof options.confirmButtonType == 'string'){
        instance.confirmButtonType = options.confirmButtonType;
    }
    if(options.text && typeof options.text == 'string'){
        instance.text = options.text;
    }
    if(options.inputLabel && typeof options.inputLabel == 'string'){
        instance.inputLabel = options.inputLabel;
    }
    if(options.inputMsg && typeof options.inputMsg == 'string'){
        instance.inputMsg = options.inputMsg;
    }
    if(options.showInput === true){
        instance.showInput = true;
    }


    instance.$on('confirm', _ => {
        resolve(_);
        cleanInstance();
    });
    instance.$on('cancel', _ => {
        reject(_);
        cleanInstance();
    });

    
    document.body.appendChild(instance.$el);
    
    Vue.nextTick(_ => {
        instance.show = true;
    });

    return new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
}

export default {
    install(Vue, options){
        Vue.prototype.$messageBox = MessageBox;
    }
};