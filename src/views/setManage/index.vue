<template>
	<div class="p-page">
		<div class="m-header">
			<el-input
				@keyup.enter="handleFilter"
				style="width: 240px; margin-right: 16px"
				class="filter-item"
				placeholder="账套名称"
				v-model="listQuery.name"
			>
			</el-input>
			<el-button
				class="filter-item"
				type="primary"
				icon="search"
				@click="handleFilter"
				>搜索</el-button
			>
		</div>

		<el-button
			class="filter-item"
			@click="handleUpdate('', 'create')"
			type="primary"
			>新增账套</el-button
		>

		<el-table
			:data="list"
			v-loading.body="listLoading"
			stripe
			highlight-current-row
			style="width: 100%; margin-top: 24px"
		>
			<el-table-column type="index" label="序号" width="65"> </el-table-column>
			<el-table-column align="center" label="账套名称">
				<template v-slot="scope">
					<div
						class="span-link"
						type="primary"
						@click="handleUpdate(scope.row.id, 'detail')"
					>
						{{ scope.row.cateName }}
					</div>
				</template>
			</el-table-column>
			<el-table-column align="center" label="启用时间">
				<template v-slot="scope">
					<span>{{ scope.row.subjectName }}</span>
				</template>
			</el-table-column>

			<el-table-column align="center" label="会计制度">
				<template v-slot="scope">
					<span>{{ scope.row.sceneName }}</span>
				</template>
			</el-table-column>

			<el-table-column align="center" label="状态">
				<template v-slot="scope">
					<el-switch
						v-model="scope.row.dcdirection"
						active-value="100"
						inactive-value="0"
					>
					</el-switch>
				</template>
			</el-table-column>

			<el-table-column align="center" label="操作" width="300" fixed="right">
				<template v-slot="scope">
					<el-button type="primary" @click="handleEnter(scope.row)"
						>进入
					</el-button>
					<el-button
						type="success"
						@click="handleUpdate(scope.row.id, 'update')"
						>修改
					</el-button>
					<el-button type="danger" @click="handleDelete(scope.row)"
						>删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="m-footer">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				v-model:current-page="listQuery.pageIndex"
				:page-sizes="[10, 20, 30, 50]"
				:page-size="listQuery.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { page, delObj } from './api/index.js';

export default {
	name: 'setManageList',
	data() {
		return {
			form: {},
			list: [{ cateName: '北京模型有限公司' }],
			total: 0,
			listLoading: false,
			listQuery: {
				pageIndex: 1,
				pageSize: 10,
				subjectId: undefined,
				sceneId: undefined,
			},
		};
	},
	mounted() {
		// this.getList()
	},
	methods: {
		getList() {
			this.listLoading = true;
			page(this.listQuery).then(response => {
				this.list = response.rows;
				this.total = response.total;
				this.listLoading = false;
			});
		},

		handleAddChange(value) {
			this.form.subjectId =
				value && value.length ? value[value.length - 1] : '';
			this.$refs.cascaderRef.dropDownVisible = false;
		},

		handleFilter() {
			this.getList();
		},
		handleSizeChange(val) {
			this.listQuery.pageSize = val;
			this.getList();
		},
		handleCurrentChange(val) {
			this.listQuery.pageIndex = val;
			this.getList();
		},

		handleUpdate(id = '', updateStatus = '') {
			this.$router.push({
				path: '/setManage/detail',
				query: {
					id,
					updateStatus,
				},
			});
		},

		handleEnter() {},
		handleDelete(row) {
			this.$confirm('你确定要删除这行内容吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				delObj({ id: row.id }).then(() => {
					this.$notify({
						title: '成功',
						message: '删除成功',
						type: 'success',
						duration: 2000,
					});
					this.getList();
				});
			});
		},
	},
};
</script>
<style lang="scss" scoped>
.p-page {
	.m-header {
		margin-bottom: 24px;
	}
	.span-link {
		color: #21baa9;
		cursor: pointer;
	}
	.m-footer{
		padding-top: 16px;
		display: flex;
		justify-content: flex-end;
	}
}
</style>
