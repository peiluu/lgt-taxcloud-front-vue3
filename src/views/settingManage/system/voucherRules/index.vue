<template>
	<div>
  </div>
		
</template>

<script>
import { mapGetters } from 'vuex';

// import { page, addObj, delObj, editObj, findTaxSubjectCascade, addTaxInvoice, findParentTaxSubject, addAccountingVoucher, findAccountingVoucher } from '../api/subject/index'

export default {
	name: 'subjectManager',
	data() {
		return {
			form: {},
			rules: {
				subjectCode: [
					{
						required: true,
						message: '请输入科目代码',
						trigger: 'blur',
					},
					{
						min: 1,
						max: 30,
						message: '长度在 1 到 20 个字符',
						trigger: 'blur',
					},
				],
				subjectName: [
					{
						required: true,
						message: '请输入科目名称',
						trigger: 'blur',
					},
					{
						min: 1,
						max: 30,
						message: '长度在 1 到 20 个字符',
						trigger: 'blur',
					},
				],
				subjectCate: [
					{
						required: true,
						message: '请选择科目类别',
						trigger: 'blur',
					},
				],
				accoutingStandard: [
					{
						required: true,
						message: '请选择会计准则',
						trigger: 'blur',
					},
				],
			},
			list: null,
			total: null,
			listLoading: true,
			listQuery: {
				pageIndex: 1,
				pageSize: 10,
				name: undefined,
			},
			dialogFormVisible: false,
			dialogStatus: '',
			textMap: {
				update: '编辑',
				create: '创建',
			},

			tableKey: 0,
			sujectCascadeList: [],
			subjectCateList: [],
			typeList: [
				{ key: 1, label: '成本' },
				{ key: 2, label: '收入' },
				{ key: 3, label: '其他' },
			],
			accoutingStandardList: [
				{ id: 1, name: '小企业会计准则' },
				{ id: 2, name: '企业会计准则' },
				{ id: 3, name: '事业单位会计准则' },
			],
			props: {
				label: 'subjectName',
				value: 'id',
				checkStrictly: true,
			},
			editId: '',
			voucherIds: [],
			resetCascader: 0,
		};
	},
	created() {
		// this.getList()
		// this.findParentTaxSubject()
	},
	computed: {
		...mapGetters(['elements']),
	},
	watch: {},

	methods: {
		findParentTaxSubject() {
			findParentTaxSubject().then(response => {
				this.subjectCateList = response;
			});
		},

		getList() {
			this.listLoading = true;
			page(this.listQuery).then(response => {
				this.list = response.rows;
				this.total = response.total;
				this.listLoading = false;
			});
		},
		handleSubjectCatChange(val) {
			this.form.pid = '';
			this.findTaxSubjectCascade(val);
		},
		findTaxSubjectCascade(id) {
			findTaxSubjectCascade(id).then(response => {
				this.sujectCascadeList = response;
			});
		},

		handleChange(value) {
			this.form.pid = value && value.length ? value[value.length - 1] : '';
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
		handleCreate() {
			this.resetTemp();
			this.dialogStatus = 'create';
			this.dialogFormVisible = true;
		},
		handleUpdate(row) {
			this.form = { ...row };
			this.editId = row.id;
			this.findTaxSubjectCascade(row.subjectCate);
			this.$nextTick(() => {
				this.dialogFormVisible = true;
				this.dialogStatus = 'update';
			});
		},
		handleDelete(row) {
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
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
		create(formName) {
			const set = this.$refs;

			set[formName].validate(valid => {
				if (valid) {
					addObj({
						...this.form,
						pid: this.form.pid || '',
					}).then(() => {
						this.dialogFormVisible = false;
						this.getList();
						this.$notify({
							title: '成功',
							message: '创建成功',
							type: 'success',
							duration: 2000,
						});
					});
				} else {
					return false;
				}
			});
		},
		cancel(formName) {
			this.dialogFormVisible = false;
			this.$refs[formName].resetFields();
			// this.getList()
		},
		update(formName) {
			const set = this.$refs;
			if (this.editId === this.form.pid) {
				this.$message.warining('请勿选择自己作为自己的父级科目！');
				return false;
			}
			set[formName].validate(valid => {
				if (valid) {
					this.dialogFormVisible = false;
					this.form.password = undefined;
					editObj(this.form).then(() => {
						this.dialogFormVisible = false;
						this.getList();
						this.$notify({
							title: '成功',
							message: '更新成功',
							type: 'success',
							duration: 2000,
						});
					});
				} else {
					return false;
				}
			});
		},
		resetTemp() {
			this.form = {};
		},
		getParentsById(list, id) {
			for (const i in list) {
				if (list[i].id === id) {
					// 查询到就返回该数组对象的value
					return [list[i].id];
				}
				if (list[i].children) {
					const node = this.getParentsById(list[i].children, id);
					if (node !== undefined) {
						// 查询到把父节把父节点加到数组前面
						node.unshift(list[i].id);
						return node;
					}
				}
			}
		},
	},
};
</script>
<style lang="scss">
.el-select,
.el-cascader {
	width: 100%;
}

.cascaderClass {
	.el-radio__inner {
		top: -18px;
		left: -19px;
		border-radius: 0;
		border: 0;
		width: 170px;
		height: 34px;
		background-color: transparent;
		cursor: pointer;
		box-sizing: border-box;
		position: absolute;
	}

	.el-radio__input.is-checked .el-radio__inner {
		background: transparent;
	}
}
</style>
