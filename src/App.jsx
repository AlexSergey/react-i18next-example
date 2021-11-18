import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, PageHeader, Select } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { addTask, removeTask, toggleStatus } from './store/slices/todoSlice';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { useLanguage } from './hooks/useLanguage';
import i18n, { languages } from './i18n';

export const App = () => {
  const currentLanguage = useLanguage();
  const { t } = useTranslation();
  const todos = useSelector(store => store.todo.tasks);
  const dispatch = useDispatch();
  const onAddTask = (value) => dispatch(addTask(value));
  const onRemoveTask = ({ id }) => dispatch(removeTask(id));
  const onToggleStatus = ({ id }) => dispatch(toggleStatus(id));
  const changeLanguage = lng => i18n.changeLanguage(lng);
  return (
    <Row
      justify="center"
      align="middle"
      gutter={[0, 20]}
      className="todos-container"
    >
      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <PageHeader
          title={t('title')}
          subTitle={t('sub_title')}
          key={currentLanguage}
          extra={(
            <Select defaultValue={currentLanguage} onChange={changeLanguage}>
              {languages.map(lng => (
                <Select.Option key={lng} value={lng}>{lng}</Select.Option>
              ))}
            </Select>
          )}
        />
      </Col>
      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Card title={(
          <Trans
            i18nKey="create"
            components={{ italic: <i />, bold: <strong /> }}
          />
        )}>
          <AddTodoForm onFormSubmit={onAddTask} />
        </Card>
      </Col>
      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Card title={t('todo_list_title')} key={currentLanguage} extra={t('list_items', { postProcess: 'other', count: todos.length })}>
          <TodoList
            todos={todos}
            onTodoRemoval={onRemoveTask}
            onTodoToggle={onToggleStatus}
          />
        </Card>
      </Col>
    </Row>
  );
}

