import Vue from 'vue'
import { Button, 
    Form, 
    FormItem, 
    Input, 
    Message , 
    Header , 
    Container , 
    Aside , 
    Main , 
    Menu , 
    Submenu , 
    MenuItem , 
    MenuItemGroup ,
    Breadcrumb ,
    BreadcrumbItem ,
    Card ,
    Row ,
    Col ,
    Table ,
    TableColumn ,
    Dialog ,
    Switch ,
    Pagination ,
    Tree ,
    Tag ,
    Cascader ,
    Timeline ,
    Upload ,
    TabPane ,
    CheckboxGroup ,
    Steps ,
    Tabs ,
} from 'element-ui'
import { MessageBox } from 'element-ui';

Vue.use(Button)
Vue.use(Tabs)
Vue.use(Steps)
Vue.use(Upload)
Vue.use(TabPane)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(CheckboxGroup)
Vue.use(Header)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Switch)
Vue.use(Pagination)
Vue.use(Tree)
Vue.use(Tag)
Vue.use(Timeline)
Vue.use(Cascader)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm