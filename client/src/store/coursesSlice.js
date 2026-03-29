import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async (_, { rejectWithValue }) => {
  try {
    const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
    const response = await fetch(`${apiBase}/api/courses`);

    if (!response.ok) {
      throw new Error(`请求失败: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success || !Array.isArray(result.data)) {
      throw new Error('课程数据格式异常');
    }

    return result.data;
  } catch (error) {
    return rejectWithValue(error.message || '加载课程失败');
  }
});

const initialState = {
  // 所有课程数据，按学段和类别分组
  courses: [],
  coursesLoading: false,
  coursesError: null,
  regions: [
    { id: 'yanzhao', name: '燕赵文化区', description: '河北/山西/陕西中北部', color: '#B11810' },
    { id: 'sanyuan', name: '三秦文化区', description: '晋陕文化号', color: '#B11810' },
    { id: 'wuyue', name: '吴越文化区', description: '两湖/东西北', color: '#B11810' },
    { id: 'guangdong', name: '广东/海南', description: '岭南文化区', color: '#C75A4F' },
    { id: 'xinjiang', name: '新疆荒漠绿洲文化区', description: '新疆/绿洲文明', color: '#21B9B5' }
  ],
  plans: [
    { id: 'qingmiao', name: '青苗计划', color: '#FF6B6B', description: '青少年文化启蒙' },
    { id: 'guiyan', name: '归雁计划', color: '#4ECDC4', description: '中青年寻根文化' },
    { id: 'sangyu', name: '桑榆计划', color: '#45B7D1', description: '中老年生命价值' }
  ],
  stages: [
    { id: 'xiaoxue', name: '小学', icon: '📚', order: 1 },
    { id: 'chuxue', name: '初中', icon: '📖', order: 2 },
    { id: 'gaoxue', name: '高中', icon: '📚', order: 3 }
  ],
  selectedRegion: null,
  selectedPlan: 'qingmiao',
  currentCourse: null
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    selectRegion: (state, action) => {
      state.selectedRegion = action.payload;
    },
    selectPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
    selectCourse: (state, action) => {
      state.currentCourse = action.payload;
    },
    clearSelection: (state) => {
      state.selectedRegion = null;
      state.currentCourse = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.coursesLoading = true;
        state.coursesError = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.coursesLoading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.coursesLoading = false;
        state.coursesError = action.payload || '加载课程失败';
      });
  }
});

export const { selectRegion, selectPlan, selectCourse, clearSelection } = coursesSlice.actions;
export default coursesSlice.reducer;
