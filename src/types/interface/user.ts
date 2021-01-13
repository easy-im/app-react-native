export interface User {
  id: number;
  nickname: string;
  mobile: number;
  password: string;
  avatar: string;
  sex: number;
  token: string;
  client_id: string;
  client_type: 'android' | 'ios';
  create_time: number;
  status: number;
}

export interface Friend {
  fid: number;
  remark: string;
  nickname: string;
  mobile?: number;
  avatar: string;
  sex: number;
  client_id: string;
  client_type: 'android' | 'ios';
  status: number;
}

export interface SearchUser {
  id: number;
  nickname: string;
  mobile: number;
  avatar: string;
  status: 0 | 1 | 2; // 可以添加，不可添加，已发送请求
}
