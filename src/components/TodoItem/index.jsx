import { Tooltip, Tag, List, Button, Popconfirm, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

import './styles.less';

export const TodoItem = ({
  todo,
  onTodoRemoval,
  onTodoToggle,
}) => {
  const { t } = useTranslation();
  return (
    <List.Item
      actions={[
        <Tooltip
          title={todo.completed ? t('uncompleted') : t('completed')}
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => onTodoToggle(todo)}
            defaultChecked={todo.completed}
          />
        </Tooltip>,
        <Popconfirm
          title={t('delete_message', { deleteText: t('delete_text') })}
          onConfirm={() => {
            onTodoRemoval(todo);
          }}
        >
          <Button className="remove-todo-button" type="primary" danger>
            X
          </Button>
        </Popconfirm>,
      ]}
      className="list-item"
      key={todo.id}
    >
      <div className="todo-item">
        <Tag color={todo.completed ? 'cyan' : 'red'} className="todo-tag">
          {todo.name}
        </Tag>
        <Tag className="todo-tag">
          {t('created_at', { date: todo.date })}
        </Tag>
      </div>
    </List.Item>
  );
};
