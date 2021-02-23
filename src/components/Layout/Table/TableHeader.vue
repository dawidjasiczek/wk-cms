<script>
export default {
    name: 'TableHeader',

    props: {
        expandable: {
            type: Boolean,
            default: false
        },
        columns: {
            type: Array,
            default(){
                return []
            }
        }
    },

    render(h){

        const expandableRow = (
            <th style="width: 45px" class="wk-table__th"></th>
        );

        return (
            <table class="wk-table__header">
                <thead class="wk-table__thead">
                    <tr>
                        { this.expandable ? expandableRow : ''}
                        {
                            (this.columns.length > 0 
                                ?
                                    this.columns.map(item => {
                                        return <th style={item.style}> { item.name } </th>   
                                    })
                                :
                                    <th>‌‌ </th>
                            )
                        }
                    </tr>
                </thead>
            </table>
        )

    }
}
</script>