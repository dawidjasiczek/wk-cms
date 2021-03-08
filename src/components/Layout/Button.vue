<script>

export default {
    render: function (createElement) {

    return createElement(
        this.tag,   // tag name
        {
            attrs: { 
                class: this.buttonClasses,
                disabled: this.disabled
            },
            on:{
                click: (e)=>{
                    this.$emit('click', e)
                }
            }
        },
        [
            this.$slots.default,
            createElement(
                'WkSpinner',
                {
                    props: {
                        show: this.loading
                    }
                }

            )
        ] 
    )
  },

  computed:{
    buttonClasses(){
        let c = ["btn"];
        
        if(this.color && this.color != null){
          c.push("btn--"+this.color)
        }
        
        if (this.type && this.type != "")
            c.push("btn--"+this.type)
         
        if (this.size == "lg")
            c.push("btn--lg")
        else if (this.size == "sm")
            c.push("btn--sm")
        else if (this.size == "xs")
            c.push("btn--xs")
        else if (this.size == "fw")
            c.push("btn--fw")

        if (this.disabled && this.disabled ==true)
            c.push("disabled")
        // if (this.loading && this.loading ==true)
        //     c.push("relative")
        c.push("relative")
        c = c.join(" ");
        c +=  " "+this.classes
        return c;
    }
  },
  props: {
    tag: {
      type: String,
      default:"button"
    },
    type: {
      type: String,
      default:""
    },
    color: {
      type: String,
      default:""
    },
    size: {
      type: String,
      default:""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    classes: {
      type: String,
      default:""
    }
  }
}
</script>