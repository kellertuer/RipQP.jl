var documenterSearchIndex = {"docs":
[{"location":"multi_precision/#Multi-precision","page":"Multi-precision","title":"Multi-precision","text":"","category":"section"},{"location":"multi_precision/#Solving-precision","page":"Multi-precision","title":"Solving precision","text":"","category":"section"},{"location":"multi_precision/","page":"Multi-precision","title":"Multi-precision","text":"You can use RipQP in several floating-point systems. The algorithm will run in the precision of the input QuadraticModel. For example, if you have a QuadraticModel qm32 in Float32, then","category":"page"},{"location":"multi_precision/","page":"Multi-precision","title":"Multi-precision","text":"stats = ripqp(qm32)","category":"page"},{"location":"multi_precision/","page":"Multi-precision","title":"Multi-precision","text":"will solve this problem in Float32. The stopping criteria of RipQP.InputTol will be adapted to the preicison of the QuadraticModel to solve.","category":"page"},{"location":"multi_precision/#Multi-precision-2","page":"Multi-precision","title":"Multi-precision","text":"","category":"section"},{"location":"multi_precision/","page":"Multi-precision","title":"Multi-precision","text":"You can use the multi-precision mode to solve a problem with a warm-start in a lower floating-point system. RipQP.InputTol contains intermediate parameters that are used to decide when to transition from a lower precision to a higher precision.","category":"page"},{"location":"multi_precision/","page":"Multi-precision","title":"Multi-precision","text":"stats = ripqp(qm, mode = :multi, itol = InputTol(ϵ_pdd32 = 1.0e-2))","category":"page"},{"location":"multi_precision/#Refinement-of-the-Quadratic-Problem","page":"Multi-precision","title":"Refinement of the Quadratic Problem","text":"","category":"section"},{"location":"multi_precision/","page":"Multi-precision","title":"Multi-precision","text":"Instead of just increasing the precision of the algorithm for the transition between precisions, it is possible to solve a refined quadratic problem.","category":"page"},{"location":"multi_precision/","page":"Multi-precision","title":"Multi-precision","text":"References:","category":"page"},{"location":"multi_precision/","page":"Multi-precision","title":"Multi-precision","text":"T. Weber, S. Sager, A. Gleixner Solving quadratic programs to high precision using scaled iterative refinement, Mathematical Programming Computation, 49(6), pp. 421-455, 2019.\nD. Ma, L. Yang, R. M. T. Fleming, I. Thiele, B. O. Palsson, M. A. Saunders Reliable and efficient solution of genome-scale models of Metabolism and macromolecular Expression, Scientific Reports 7, 40863, 2017.","category":"page"},{"location":"multi_precision/","page":"Multi-precision","title":"Multi-precision","text":"stats = ripqp(qm, mode = :multiref, itol = InputTol(ϵ_pdd32 = 1.0e-2))\nstats = ripqp(qm, mode = :multizoom, itol = InputTol(ϵ_pdd32 = 1.0e-2))","category":"page"},{"location":"multi_precision/","page":"Multi-precision","title":"Multi-precision","text":"The two presented algorithms follow the procedure described in each of the two above references.","category":"page"},{"location":"multi_precision/#Switching-solvers-when-increasing-precision","page":"Multi-precision","title":"Switching solvers when increasing precision","text":"","category":"section"},{"location":"multi_precision/","page":"Multi-precision","title":"Multi-precision","text":"Instead of using the same solver after the transition between two floating-point systems, it is possible to switch to another solver, if a conversion function from the old solver to the new solvers is implemented.","category":"page"},{"location":"multi_precision/","page":"Multi-precision","title":"Multi-precision","text":"stats = ripqp(qm, mode = :multiref, solve_method = IPF(),\n              sp = K2LDLParams(),\n              sp2 = K2KrylovParams(uplo = :U, preconditioner = LDL(T = Float32)))\n# start with K2LDL in Float32, then transition to Float64, \n# then use K2Krylov in Float64 with a LDL preconditioner in Float32.","category":"page"},{"location":"switch_solv/#Switching-solvers","page":"Switching solvers","title":"Switching solvers","text":"","category":"section"},{"location":"switch_solv/#Solve-method","page":"Switching solvers","title":"Solve method","text":"","category":"section"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"By default, RipQP uses a predictor-corrector algorithm that solves two linear systems per interior-point iteration. This is efficient when using a factorization to solve the interior-point system. It is also possible to use an infeasible path-following algorithm, which is efficient when solving each system is more expensive (for example when using a Krylov method without preconditioner).","category":"page"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"stats = ripqp(qm, solve_method = PC()) # predictor-corrector (default)\nstats = ripqp(qm, solve_method = IPF()) # infeasible path-following","category":"page"},{"location":"switch_solv/#Choosing-a-solver","page":"Switching solvers","title":"Choosing a solver","text":"","category":"section"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"It is possible to choose different solvers to solve the interior-point system. All these solvers can be called with a structure that is a subtype of a RipQP.SolverParams. The default solver is RipQP.K2LDLParams.","category":"page"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"There are a lot of solvers that are implemented using Krylov methods from Krylov.jl. For example:","category":"page"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"stats = ripqp(qm, sp = K2KrylovParams())","category":"page"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"These solvers are usually less efficient, but they can be used with a preconditioner to improve the performances. All these preconditioners can be called with a structure that is a subtype of an AbstractPreconditioner. By default, most Krylov solvers use the RipQP.Identity preconditioner, but is possible to use for example a LDL factorization RipQP.LDL. The Krylov method then acts as form of using iterative refinement to a LDL factorization of K2:","category":"page"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"stats = ripqp(qm, sp = K2KrylovParams(uplo = :U, preconditioner = LDL())) \n# uplo = :U is mandatory with this preconditioner","category":"page"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"It is also possible to change the Krylov method used to solve the system:","category":"page"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"stats = ripqp(qm, sp = K2KrylovParams(uplo = :U, kmethod = :gmres, preconditioner = LDL()))","category":"page"},{"location":"switch_solv/#Logging-for-Krylov-Solver","page":"Switching solvers","title":"Logging for Krylov Solver","text":"","category":"section"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"Solvers using a Krylov method have two more log columns. The first one is the number of iterations to solve the interior-point system with the Krylov method, and the second one is a character indication the output status of the Krylov method. The different characters are 'u' for user-requested exit (callback), 'i' for maximum number of iterations exceeded, and 's' otherwise.","category":"page"},{"location":"switch_solv/#Advanced:-write-your-own-solver","page":"Switching solvers","title":"Advanced: write your own solver","text":"","category":"section"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"You can use your own solver to compute the direction of descent inside RipQP at each iteration. Here is a basic example using the package LDLFactorizations.jl.","category":"page"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"First, you will need a RipQP.SolverParams to define parameters for your solver:","category":"page"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"using RipQP, LinearAlgebra, LDLFactorizations, SparseArrays\n\nstruct K2basicLDLParams{T<:Real} <: SolverParams\n    uplo   :: Symbol # mandatory, tells RipQP which triangle of the augmented system to store\n    ρ      :: T # dual regularization\n    δ      :: T # primal regularization\nend","category":"page"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"Then, you will have to create a type that allocates space for your solver, and a constructor using the following parameters:","category":"page"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"mutable struct PreallocatedDataK2basic{T<:Real, S} <: RipQP.PreallocatedDataAugmented{T, S}\n    D                :: S # temporary top-left diagonal of the K2 system\n    ρ                :: T # dual regularization\n    δ                :: T # primal regularization\n    K                :: SparseMatrixCSC{T,Int} # K2 matrix\n    K_fact           :: LDLFactorizations.LDLFactorization{T,Int,Int,Int} # factorized K2\nend","category":"page"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"Now you need to write a RipQP.PreallocatedData function that returns your type:","category":"page"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"function RipQP.PreallocatedData(sp :: SolverParams, fd :: RipQP.QM_FloatData{T},\n                                id :: RipQP.QM_IntData, itd :: RipQP.IterData{T},\n                                pt :: RipQP.Point{T},\n                                iconf :: InputConfig{Tconf}) where {T<:Real, Tconf<:Real}\n\n    ρ, δ = T(sp.ρ), T(sp.δ)\n    K = spzeros(T, id.ncon+id.nvar, id.ncon + id.nvar)\n    K[1:id.nvar, 1:id.nvar] = .-fd.Q .- ρ .* Diagonal(ones(T, id.nvar))\n    # A = Aᵀ of the input QuadraticModel since we use the upper triangle:\n    K[1:id.nvar, id.nvar+1:end] = fd.A \n    K[diagind(K)[id.nvar+1:end]] .= δ\n\n    K_fact = ldl_analyze(Symmetric(K, :U))\n    @assert sp.uplo == :U # LDLFactorizations does not work with the lower triangle\n    K_fact = ldl_factorize!(Symmetric(K, :U), K_fact)\n    K_fact.__factorized = true\n\n    return PreallocatedDataK2basic(zeros(T, id.nvar),\n                                    ρ,\n                                    δ,\n                                    K, #K\n                                    K_fact #K_fact\n                                    )\nend","category":"page"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"Then, you need to write a RipQP.update_pad! function that will update the RipQP.PreallocatedData struct before computing the direction of descent.","category":"page"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"function RipQP.update_pad!(pad :: PreallocatedDataK2basic{T}, dda :: RipQP.DescentDirectionAllocs{T},\n                           pt :: RipQP.Point{T}, itd :: RipQP.IterData{T},\n                           fd :: RipQP.Abstract_QM_FloatData{T}, id :: RipQP.QM_IntData,\n                           res :: RipQP.Residuals{T}, cnts :: RipQP.Counters,\n                           T0 :: RipQP.DataType) where {T<:Real}\n\n    # update the diagonal of K2\n    pad.D .= -pad.ρ\n    pad.D[id.ilow] .-= pt.s_l ./ itd.x_m_lvar\n    pad.D[id.iupp] .-= pt.s_u ./ itd.uvar_m_x\n    pad.D .-= fd.Q[diagind(fd.Q)]\n    pad.K[diagind(pad.K)[1:id.nvar]] = pad.D\n    pad.K[diagind(pad.K)[id.nvar+1:end]] .= pad.δ\n\n    # factorize K2\n    ldl_factorize!(Symmetric(pad.K, :U), pad.K_fact)\n\nend","category":"page"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"Finally, you need to write a RipQP.solver! function that compute directions of descent. Note that this function solves in-place the linear system by overwriting the direction of descent. That is why the direction of descent dd  countains the right hand side of the linear system to solve.","category":"page"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"function RipQP.solver!(dd :: AbstractVector{T}, pad :: PreallocatedDataK2basic{T},\n                       dda :: RipQP.DescentDirectionAllocsPC{T}, pt :: RipQP.Point{T},\n                       itd :: RipQP.IterData{T}, fd :: RipQP.Abstract_QM_FloatData{T},\n                       id :: RipQP.QM_IntData, res :: RipQP.Residuals{T},\n                       cnts :: RipQP.Counters, T0 :: DataType,\n                       step :: Symbol) where {T<:Real}\n\n    ldiv!(pad.K_fact, dd)\n    return 0\nend","category":"page"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"Then, you can use your solver:","category":"page"},{"location":"switch_solv/","page":"Switching solvers","title":"Switching solvers","text":"using QuadraticModels, QPSReader\nqm = QuadraticModel(readqps(\"QAFIRO.SIF\"))\nstats1 = ripqp(qm, sp = K2basicLDLParams(:U, 1.0e-6, 1.0e-6))","category":"page"},{"location":"reference/#Reference","page":"Reference","title":"Reference","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"​","category":"page"},{"location":"reference/#Contents","page":"Reference","title":"Contents","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"​","category":"page"},{"location":"reference/","page":"Reference","title":"Reference","text":"Pages = [\"reference.md\"]","category":"page"},{"location":"reference/","page":"Reference","title":"Reference","text":"​","category":"page"},{"location":"reference/#Index","page":"Reference","title":"Index","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"​","category":"page"},{"location":"reference/","page":"Reference","title":"Reference","text":"","category":"page"},{"location":"#Home","page":"Home","title":"RipQP.jl documentation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This package provides a solver for minimizing convex quadratic problems, of the form:","category":"page"},{"location":"","page":"Home","title":"Home","text":"    min frac12 x^T Q x + c^T x + c_0  st  ell con le A x le ucon  ell le x le u ","category":"page"},{"location":"","page":"Home","title":"Home","text":"where Q is positive semi-definite and the bounds on x and Ax can be infinite.","category":"page"},{"location":"","page":"Home","title":"Home","text":"RipQP uses Interior Point Methods and incorporates several linear algebra and optimization techniques.  It can run in several floating-point systems, and is able to switch between floating-point systems during the  resolution of a problem.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The user should be able to write its own solver to compute the direction of descent that should be used  at each iterate of RipQP.","category":"page"},{"location":"","page":"Home","title":"Home","text":"RipQP can also solve constrained linear least squares problems:","category":"page"},{"location":"","page":"Home","title":"Home","text":"    min frac12  A x - b ^2  st  c_L le C x le c_U  ell le x le u ","category":"page"},{"location":"tutorial/#Tutorial","page":"Tutorial","title":"Tutorial","text":"","category":"section"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"Check an introduction to RipQP and more tutorials on the JSO tutorials page.","category":"page"},{"location":"API/#RipQP","page":"API","title":"RipQP","text":"","category":"section"},{"location":"API/","page":"API","title":"API","text":"ripqp","category":"page"},{"location":"API/#RipQP.ripqp","page":"API","title":"RipQP.ripqp","text":"stats = ripqp(QM :: QuadraticModel{T0};\n              itol = InputTol(T0), scaling = true, ps = true,\n              normalize_rtol = true, kc = 0, mode = :mono, perturb = false,\n              Timulti = Float32, early_multi_stop = true,\n              sp = (mode == :mono) ? K2LDLParams{T0}() : K2LDLParams{Timulti}(),\n              sp2 = nothing, sp3 = nothing, \n              solve_method = PC(), \n              history = false, w = SystemWrite(), display = true) where {T0<:Real}\n\nMinimize a convex quadratic problem. Algorithm stops when the criteria in pdd, rb, and rc are valid. Returns a GenericExecutionStats  containing information about the solved problem.\n\nQM :: QuadraticModel: problem to solve\nitol :: InputTol{T, Int} input Tolerances for the stopping criteria. See RipQP.InputTol.\nscaling :: Bool: activate/deactivate scaling of A and Q in QM0\nps :: Bool : activate/deactivate presolve\nnormalize_rtol :: Bool = true : if true, the primal and dual tolerance for the stopping criteria    are normalized by the initial primal and dual residuals\nkc :: Int: number of centrality corrections (set to -1 for automatic computation)\nperturb :: Bool : activate / deativate perturbation of the current point when μ is too small\nmode :: Symbol: should be :mono to use the mono-precision mode, :multi to use   the multi-precision mode (start in single precision and gradually transitions   to T0), :zoom to use the zoom procedure, :multizoom to use the zoom procedure    with multi-precision, ref to use the QP refinement procedure, or multiref    to use the QP refinement procedure with multi_precision\nTimulti :: DataType: initial floating-point format to solve the QP (only usefull in multi-precision),   it should be lower than the QP precision\nearly_multi_stop :: Bool : stop the iterations in lower precision systems earlier in multi-precision mode,   based on some quantities of the algorithm\nsp :: SolverParams : choose a solver to solve linear systems that occurs at each iteration and during the    initialization, see RipQP.SolverParams\nsp2 :: Union{Nothing, SolverParams} and sp3 :: Union{Nothing, SolverParams} : choose second and third solvers   to solve linear systems that occurs at each iteration in the second and third solving phase when mode != :mono,    leave to nothing if you want to keep using sp. \nsolve_method :: SolveMethod : method used to solve the system at each iteration, use solve_method = PC() to    use the Predictor-Corrector algorithm (default), and use solve_method = IPF() to use the Infeasible Path    Following algorithm\nhistory :: Bool : set to true to return the primal and dual norm histories, the primal-dual relative difference   history, and the number of products if using a Krylov method in the solver_specific field of the    GenericExecutionStats\nw :: SystemWrite: configure writing of the systems to solve (no writing is done by default), see RipQP.SystemWrite\ndisplay::Bool: activate/deactivate iteration data display\n\nYou can also use ripqp to solve a LLSModel:\n\nstats = ripqp(LLS::LLSModel{T0}; mode = :mono, Timulti = Float32,\n              sp = (mode == :mono) ? K2LDLParams{T0}() : K2LDLParams{Timulti}(), \n              kwargs...) where {T0 <: Real}\n\n\n\n\n\n","category":"function"},{"location":"API/#Input-Types","page":"API","title":"Input Types","text":"","category":"section"},{"location":"API/","page":"API","title":"API","text":"InputTol\nSystemWrite","category":"page"},{"location":"API/#RipQP.InputTol","page":"API","title":"RipQP.InputTol","text":"Type to specify the tolerances used by RipQP.\n\nmax_iter :: Int: maximum number of iterations\nϵ_pdd: relative primal-dual difference tolerance\nϵ_rb: primal tolerance\nϵ_rc: dual tolerance\nmax_iter32, ϵ_pdd32, ϵ_rb32, ϵ_rc32: same as max_iter, ϵ_pdd, ϵ_rb and   ϵ_rc, but used for switching from single precision to double precision. They are   only usefull when mode=:multi\nmax_iter64, ϵ_pdd64, ϵ_rb64, ϵ_rc64: same as max_iter, ϵ_pdd, ϵ_rb and   ϵ_rc, but used for switching from double precision to quadruple precision. They   are only usefull when mode=:multi and T0=Float128\nϵ_rbz : primal transition tolerance for the zoom procedure, (used only if refinement=:zoom)\nϵ_Δx: step tolerance for the current point estimate (note: this criterion   is currently disabled)\nϵ_μ: duality measure tolerance (note: this criterion is currently disabled)\nmax_time: maximum time to solve the QP\n\nThe constructor\n\nitol = InputTol(::Type{T};\n                max_iter :: I = 200, max_iter32 :: I = 40, max_iter64 :: I = 180, \n                ϵ_pdd :: T = 1e-8, ϵ_pdd32 :: T = 1e-2, ϵ_pdd64 :: T = 1e-4, \n                ϵ_rb :: T = 1e-6, ϵ_rb32 :: T = 1e-4, ϵ_rb64 :: T = 1e-5, ϵ_rbz :: T = 1e-3,\n                ϵ_rc :: T = 1e-6, ϵ_rc32 :: T = 1e-4, ϵ_rc64 :: T = 1e-5,\n                ϵ_Δx :: T = 1e-16, ϵ_μ :: T = 1e-9) where {T<:Real, I<:Integer}\n\nInputTol(; kwargs...) = InputTol(Float64; kwargs...)\n\nreturns a InputTol struct that initializes the stopping criteria for RipQP.  The 32 and 64 characters refer to the stopping criteria in :multi mode for the transitions from Float32 to Float64  and Float64 to Float128 (if the input QuadraticModel is in Float128) respectively.\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.SystemWrite","page":"API","title":"RipQP.SystemWrite","text":"Type to write the matrix (.mtx format) and the right hand side (.rhs format) of the system to solve at each iteration.\n\nwrite::Bool: activate/deactivate writing of the system \nname::String: name of the sytem to solve \nkfirst::Int: first iteration where a system should be written\nkgap::Int: iteration gap between two problem writings\n\nThe constructor\n\nSystemWrite(; write = false, name = \"\", kfirst = 0, kgap = 1)\n\nreturns a SystemWrite structure that should be used to tell RipQP to save the system.  See the tutorial for more information. \n\n\n\n\n\n","category":"type"},{"location":"API/#Solvers","page":"API","title":"Solvers","text":"","category":"section"},{"location":"API/","page":"API","title":"API","text":"SolverParams\nK2LDLParams\nK2_5LDLParams\nK2KrylovParams\nK2_5KrylovParams\nK2StructuredParams\nK2_5StructuredParams\nK3KrylovParams\nK3SKrylovParams\nK3SStructuredParams\nK3_5KrylovParams\nK3_5StructuredParams\nK1KrylovParams\nK1CholDenseParams\nK2LDLDenseParams\nK1_1StructuredParams\nK1_2StructuredParams","category":"page"},{"location":"API/#RipQP.SolverParams","page":"API","title":"RipQP.SolverParams","text":"Abstract type for tuning the parameters of the different solvers.  Each solver has its own SolverParams type.\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.K2LDLParams","page":"API","title":"RipQP.K2LDLParams","text":"Type to use the K2 formulation with a LDLᵀ factorization. The package LDLFactorizations.jl is used by default. The outer constructor \n\nsp = K2LDLParams(; fact_alg = LDLFact(regul = :classic),\n                 ρ0 = sqrt(eps()) * 1e5, δ0 = sqrt(eps()) * 1e5)\n\ncreates a RipQP.SolverParams. regul = :dynamic uses a dynamic regularization (the regularization is only added if the LDLᵀ factorization  encounters a pivot that has a small magnitude). regul = :none uses no regularization (not recommended). When regul = :classic, the parameters ρ0 and δ0 are used to choose the initial regularization values. fact_alg should be a RipQP.AbstractFactorization.\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.K2_5LDLParams","page":"API","title":"RipQP.K2_5LDLParams","text":"Type to use the K2.5 formulation with a LDLᵀ factorization. The package LDLFactorizations.jl is used by default. The outer constructor \n\nsp = K2_5LDLParams(; fact_alg = LDLFact(regul = :classic), ρ0 = sqrt(eps()) * 1e5, δ0 = sqrt(eps()) * 1e5)\n\ncreates a RipQP.SolverParams. regul = :dynamic uses a dynamic regularization (the regularization is only added if the LDLᵀ factorization  encounters a pivot that has a small magnitude). regul = :none uses no regularization (not recommended). When regul = :classic, the parameters ρ0 and δ0 are used to choose the initial regularization values. fact_alg should be a RipQP.AbstractFactorization.\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.K2KrylovParams","page":"API","title":"RipQP.K2KrylovParams","text":"Type to use the K2 formulation with a Krylov method, using the package  Krylov.jl.  The outer constructor \n\nK2KrylovParams(; uplo = :L, kmethod = :minres, preconditioner = Identity(),\n               rhs_scale = true, form_mat = false, equilibrate = false,\n               atol0 = 1.0e-4, rtol0 = 1.0e-4, \n               atol_min = 1.0e-10, rtol_min = 1.0e-10,\n               ρ0 = sqrt(eps()) * 1e5, δ0 = sqrt(eps()) * 1e5, \n               ρ_min = 1e2 * sqrt(eps()), δ_min = 1e2 * sqrt(eps()),\n               itmax = 0, memory = 20)\n\ncreates a RipQP.SolverParams.\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.K2_5KrylovParams","page":"API","title":"RipQP.K2_5KrylovParams","text":"Type to use the K2.5 formulation with a Krylov method, using the package  Krylov.jl.  The outer constructor \n\nK2_5KrylovParams(; uplo = :L, kmethod = :minres, preconditioner = Identity(),\n                 rhs_scale = true,\n                 atol0 = 1.0e-4, rtol0 = 1.0e-4, \n                 atol_min = 1.0e-10, rtol_min = 1.0e-10,\n                 ρ0 = sqrt(eps()) * 1e5, δ0 = sqrt(eps()) * 1e5, \n                 ρ_min = 1e2 * sqrt(eps()), δ_min = 1e2 * sqrt(eps()),\n                 itmax = 0, mem = 20)\n\ncreates a RipQP.SolverParams. The available methods are:\n\n:minres\n:minres_qlp\n:symmlq\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.K2StructuredParams","page":"API","title":"RipQP.K2StructuredParams","text":"Type to use the K2 formulation with a structured Krylov method, using the package  Krylov.jl. This only works for solving Linear Problems. The outer constructor \n\nK2StructuredParams(; uplo = :L, kmethod = :trimr, rhs_scale = true, \n                   atol0 = 1.0e-4, rtol0 = 1.0e-4,\n                   atol_min = 1.0e-10, rtol_min = 1.0e-10, \n                   ρ_min = 1e2 * sqrt(eps()), δ_min = 1e2 * sqrt(eps()),\n                   itmax = 0, mem = 20)\n\ncreates a RipQP.SolverParams. The available methods are:\n\n:tricg\n:trimr\n:gpmr\n\nThe mem argument sould be used only with gpmr.\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.K2_5StructuredParams","page":"API","title":"RipQP.K2_5StructuredParams","text":"Type to use the K2.5 formulation with a structured Krylov method, using the package  Krylov.jl. This only works for solving Linear Problems. The outer constructor \n\nK2_5StructuredParams(; uplo = :L, kmethod = :trimr, rhs_scale = true,\n                     atol0 = 1.0e-4, rtol0 = 1.0e-4,\n                     atol_min = 1.0e-10, rtol_min = 1.0e-10,\n                     ρ0 = sqrt(eps()) * 1e5, δ0 = sqrt(eps()) * 1e5,\n                     ρ_min = 1e2 * sqrt(eps()), δ_min = 1e2 * sqrt(eps()),\n                     itmax = 0, mem = 20)\n\ncreates a RipQP.SolverParams. The available methods are:\n\n:tricg\n:trimr\n:gpmr\n\nThe mem argument sould be used only with gpmr.\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.K3KrylovParams","page":"API","title":"RipQP.K3KrylovParams","text":"Type to use the K3 formulation with a Krylov method, using the package  Krylov.jl.  The outer constructor \n\nK3KrylovParams(; uplo = :L, kmethod = :qmr, preconditioner = Identity(),\n               rhs_scale = true,\n               atol0 = 1.0e-4, rtol0 = 1.0e-4,\n               atol_min = 1.0e-10, rtol_min = 1.0e-10,\n               ρ0 = sqrt(eps()) * 1e5, δ0 = sqrt(eps()) * 1e5,\n               ρ_min = 1e3 * sqrt(eps()), δ_min = 1e4 * sqrt(eps()),\n               itmax = 0, mem = 20)\n\ncreates a RipQP.SolverParams. The available methods are:\n\n:qmr\n:bicgstab\n:usymqr\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.K3SKrylovParams","page":"API","title":"RipQP.K3SKrylovParams","text":"Type to use the K3S formulation with a Krylov method, using the package  Krylov.jl.  The outer constructor \n\nK3SKrylovParams(; uplo = :L, kmethod = :minres, preconditioner = Identity(),\n                 rhs_scale = true,\n                 atol0 = 1.0e-4, rtol0 = 1.0e-4,\n                 atol_min = 1.0e-10, rtol_min = 1.0e-10,\n                 ρ0 = sqrt(eps()) * 1e5, δ0 = sqrt(eps()) * 1e5,\n                 ρ_min = 1e3 * sqrt(eps()), δ_min = 1e4 * sqrt(eps()),\n                 itmax = 0, mem = 20)\n\ncreates a RipQP.SolverParams. The available methods are:\n\n:minres\n:minres_qlp\n:symmlq\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.K3SStructuredParams","page":"API","title":"RipQP.K3SStructuredParams","text":"Type to use the K3S formulation with a Krylov method, using the package  Krylov.jl.  The outer constructor \n\nK3SStructuredParams(; uplo = :U, kmethod = :trimr, rhs_scale = true,\n                     atol0 = 1.0e-4, rtol0 = 1.0e-4, \n                     atol_min = 1.0e-10, rtol_min = 1.0e-10,\n                     ρ0 =  sqrt(eps()) * 1e3, δ0 = sqrt(eps()) * 1e4,\n                     ρ_min = 1e4 * sqrt(eps()), δ_min = 1e4 * sqrt(eps()),\n                     itmax = 0, mem = 20)\n\ncreates a RipQP.SolverParams. The available methods are:\n\n:tricg\n:trimr\n:gpmr\n\nThe mem argument sould be used only with gpmr.\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.K3_5KrylovParams","page":"API","title":"RipQP.K3_5KrylovParams","text":"Type to use the K3.5 formulation with a Krylov method, using the package  Krylov.jl.  The outer constructor \n\nK3_5KrylovParams(; uplo = :L, kmethod = :minres, preconditioner = Identity(),\n                 rhs_scale = true,\n                 atol0 = 1.0e-4, rtol0 = 1.0e-4,\n                 atol_min = 1.0e-10, rtol_min = 1.0e-10,\n                 ρ0 = sqrt(eps()) * 1e5, δ0 = sqrt(eps()) * 1e5,\n                 ρ_min = 1e3 * sqrt(eps()), δ_min = 1e4 * sqrt(eps()),\n                 itmax = 0, mem = 20)\n\ncreates a RipQP.SolverParams. The available methods are:\n\n:minres\n:minres_qlp\n:symmlq\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.K3_5StructuredParams","page":"API","title":"RipQP.K3_5StructuredParams","text":"Type to use the K3.5 formulation with a Krylov method, using the package  Krylov.jl.  The outer constructor \n\nK3_5StructuredParams(; uplo = :U, kmethod = :trimr, rhs_scale = true,\n                     atol0 = 1.0e-4, rtol0 = 1.0e-4, \n                     atol_min = 1.0e-10, rtol_min = 1.0e-10,\n                     ρ0 =  sqrt(eps()) * 1e3, δ0 = sqrt(eps()) * 1e4,\n                     ρ_min = 1e4 * sqrt(eps()), δ_min = 1e4 * sqrt(eps()),\n                     itmax = 0, mem = 20)\n\ncreates a RipQP.SolverParams. The available methods are:\n\n:tricg\n:trimr\n:gpmr\n\nThe mem argument sould be used only with gpmr.\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.K1KrylovParams","page":"API","title":"RipQP.K1KrylovParams","text":"Type to use the K1 formulation with a Krylov method, using the package  Krylov.jl.  The outer constructor \n\nK1KrylovParams(; uplo = :L, kmethod = :cg, preconditioner = Identity(),\n               rhs_scale = true,\n               atol0 = 1.0e-4, rtol0 = 1.0e-4, \n               atol_min = 1.0e-10, rtol_min = 1.0e-10,\n               ρ0 = sqrt(eps()) * 1e5, δ0 = sqrt(eps()) * 1e5, \n               ρ_min = 1e2 * sqrt(eps()), δ_min = 1e2 * sqrt(eps()),\n               itmax = 0, mem = 20)\n\ncreates a RipQP.SolverParams. The available methods are:\n\n:cg\n:cg_lanczos\n:cr\n:minres\n:minres_qlp\n:symmlq\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.K1CholDenseParams","page":"API","title":"RipQP.K1CholDenseParams","text":"Type to use the K1 formulation with a dense Cholesky factorization. The input QuadraticModel should have lcon .== ucon. The outer constructor \n\nsp = K1CholDenseParams(; ρ0 = sqrt(eps()) * 1e5, δ0 = sqrt(eps()) * 1e5)\n\ncreates a RipQP.SolverParams.\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.K2LDLDenseParams","page":"API","title":"RipQP.K2LDLDenseParams","text":"Type to use the K2 formulation with a LDLᵀ factorization.  The outer constructor \n\nsp = K2LDLDenseParams(; ρ0 = sqrt(eps()) * 1e5, δ0 = sqrt(eps()) * 1e5)\n\ncreates a RipQP.SolverParams.\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.K1_1StructuredParams","page":"API","title":"RipQP.K1_1StructuredParams","text":"Type to use the K1.1 formulation with a structured Krylov method, using the package  Krylov.jl. This only works for solving Linear Problems. The outer constructor \n\nK1_1StructuredParams(; uplo = :L, kmethod = :lsqr, rhs_scale = true,\n                     atol0 = 1.0e-4, rtol0 = 1.0e-4,\n                     atol_min = 1.0e-10, rtol_min = 1.0e-10, \n                     ρ_min = 1e3 * sqrt(eps()), δ_min = 1e4 * sqrt(eps()),\n                     itmax = 0, mem = 20)\n\ncreates a RipQP.SolverParams. The available methods are:\n\n:lslq\n:lsqr\n:lsmr\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.K1_2StructuredParams","page":"API","title":"RipQP.K1_2StructuredParams","text":"Type to use the K1.2 formulation with a structured Krylov method, using the package  Krylov.jl. This only works for solving Linear Problems. The outer constructor \n\nK1_2StructuredParams(; uplo = :L, kmethod = :craig, rhs_scale = true,\n                     atol0 = 1.0e-4, rtol0 = 1.0e-4,\n                     atol_min = 1.0e-10, rtol_min = 1.0e-10, \n                     ρ_min = 1e3 * sqrt(eps()), δ_min = 1e4 * sqrt(eps()),\n                     itmax = 0, mem = 20)\n\ncreates a RipQP.SolverParams. The available methods are:\n\n:lnlq\n:craig\n:craigmr\n\n\n\n\n\n","category":"type"},{"location":"API/#Preconditioners","page":"API","title":"Preconditioners","text":"","category":"section"},{"location":"API/","page":"API","title":"API","text":"AbstractPreconditioner\nIdentity\nJacobi\nEquilibration\nLDL\nLLDL","category":"page"},{"location":"API/#RipQP.AbstractPreconditioner","page":"API","title":"RipQP.AbstractPreconditioner","text":"Abstract type for the preconditioners used with a solver using a Krylov method.\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.Identity","page":"API","title":"RipQP.Identity","text":"preconditioner = Identity()\n\nTells RipQP not to use a preconditioner.\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.Jacobi","page":"API","title":"RipQP.Jacobi","text":"preconditioner = Jacobi()\n\nPreconditioner using the inverse of the diagonal of the system to solve. Works with:\n\nK2KrylovParams\nK2_5KrylovParams\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.Equilibration","page":"API","title":"RipQP.Equilibration","text":"preconditioner = Equilibration()\n\nPreconditioner using the equilibration algorithm in infinity norm. Works with:\n\nK2KrylovParams\nK3SKrylovParams\nK3_5KrylovParams\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.LDL","page":"API","title":"RipQP.LDL","text":"preconditioner = LDL(; T = Float32, pos = :C, warm_start = true, fact_alg = LDLFact())\n\nPreconditioner for K2KrylovParams using a LDL factorization in precision T. The pos argument is used to choose the type of preconditioning with an unsymmetric Krylov method. It can be :C (center), :L (left) or :R (right). The warm_start argument tells RipQP to solve the system with the LDL factorization before using the Krylov method with the LDLFactorization as a preconditioner. fact_alg should be a RipQP.AbstractFactorization.\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.LLDL","page":"API","title":"RipQP.LLDL","text":"preconditioner = LLDL(; T = Float64, mem = 0, droptol = 0.0)\n\nPreconditioner for K2KrylovParams using a limited LDL factorization in precision T. See LimitedLDLFactorizations.jl for the mem and droptol parameters.\n\n\n\n\n\n","category":"type"},{"location":"API/#Factorizations","page":"API","title":"Factorizations","text":"","category":"section"},{"location":"API/","page":"API","title":"API","text":"AbstractFactorization\nLDLFact\nCholmodFact\nQDLDLFact\nHSLMA57Fact\nHSLMA97Fact","category":"page"},{"location":"API/#RipQP.AbstractFactorization","page":"API","title":"RipQP.AbstractFactorization","text":"Abstract type to select a factorization algorithm.\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.LDLFact","page":"API","title":"RipQP.LDLFact","text":"fact_alg = LDLFact(; regul = :classic)\n\nChoose LDLFactorizations.jl to compute factorizations.\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.CholmodFact","page":"API","title":"RipQP.CholmodFact","text":"fact_alg = CholmodFact(; regul = :classic)\n\nChoose ldlt from Cholmod to compute factorizations. using SuiteSparse should be used before using RipQP.\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.QDLDLFact","page":"API","title":"RipQP.QDLDLFact","text":"fact_alg = QDLDLFact(; regul = :classic)\n\nChoose QDLDL.jl to compute factorizations. using QDLDL should be used before using RipQP.\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.HSLMA57Fact","page":"API","title":"RipQP.HSLMA57Fact","text":"fact_alg = HSLMA57Fact(; regul = :classic)\n\nChoose HSL.jl MA57 to compute factorizations. using HSL should be used before using RipQP.\n\n\n\n\n\n","category":"type"},{"location":"API/#RipQP.HSLMA97Fact","page":"API","title":"RipQP.HSLMA97Fact","text":"fact_alg = HSLMA97Fact(; regul = :classic)\n\nChoose HSL.jl MA57 to compute factorizations. using HSL should be used before using RipQP.\n\n\n\n\n\n","category":"type"}]
}
